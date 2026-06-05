import os
import math
import sqlite3
import logging
from functools import wraps
from flask import Flask, render_template, request, redirect, g, session, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf.csrf import CSRFProtect






logging.basicConfig(level=logging.DEBUG)

try:
    import psycopg2
    import psycopg2.extras
    PSYCOPG2_AVAILABLE = True
except ImportError:
    PSYCOPG2_AVAILABLE = False

app = Flask(__name__)


app.secret_key = os.environ.get('SECRET_KEY', 'fallback-secret')

# Allow the Next.js frontend to call /api/* endpoints
_frontend_origin = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
CORS(app, resources={r"/api/*": {"origins": [_frontend_origin, "https://*.vercel.app"]}})
TRANSLATIONS = {
    'en': {
        'home': 'Home',
        'find_jobs': 'Find Jobs',
        'career_advice': 'Career Advice',
        'categories': 'Categories',
        'search_placeholder': 'Search jobs...',
        'login': 'Login',
        'signup': 'Sign Up',
        'logout': 'Logout',
        'apply_now': 'Apply Now',
        'latest_jobs': 'Latest Openings',
        'featured_positions': 'Featured Positions',
        'top_compensation': 'Top Compensation',
        'browse_categories': 'Browse Categories',
        'footer_text': 'Data from Wuzzuf.net',
        'search': 'Search',
        'go': 'Go',
        'welcome_back': 'Welcome back',
        'sign_in_account': 'Sign in to your Tawtheef account',
        'email_address': 'Email address',
        'password': 'Password',
        'forgot_password': 'Forgot password?',
        'login_btn': 'Login →',
        'or_continue': 'or continue with',
        'continue_google': 'Continue with Google',
        'create_account': 'Create account',
        'join_thousands': 'Join thousands of job seekers in Egypt',
        'full_name': 'Full name',
        'signup_btn': 'Create Account →',
    },
    'ar': {
        'home': 'الرئيسية',
        'find_jobs': 'البحث عن وظائف',
        'career_advice': 'نصائح مهنية',
        'categories': 'التصنيفات',
        'search_placeholder': 'ابحث عن وظائف...',
        'login': 'دخول',
        'signup': 'تسجيل',
        'logout': 'خروج',
        'apply_now': 'تقدم الآن',
        'latest_jobs': 'أحدث الوظائف',
        'featured_positions': 'وظائف مميزة',
        'top_compensation': 'أعلى الرواتب',
        'browse_categories': 'تصفح التصنيفات',
        'footer_text': 'بيانات من Wuzzuf.net',
        'search': 'بحث',
        'go': 'بحث',
        'welcome_back': 'مرحباً بعودتك',
        'sign_in_account': 'سجل الدخول إلى حساب توظيف مصر',
        'email_address': 'البريد الإلكتروني',
        'password': 'كلمة المرور',
        'forgot_password': 'نسيت كلمة المرور؟',
        'login_btn': '← دخول',
        'or_continue': 'أو تابع باستخدام',
        'continue_google': 'تابع مع جوجل',
        'create_account': 'إنشاء حساب',
        'join_thousands': 'انضم إلى آلاف الباحثين عن عمل في مصر',
        'full_name': 'الاسم الكامل',
        'signup_btn': '← إنشاء حساب',
    }
}

limiter = Limiter(app=app, key_func=get_remote_address)
csrf = CSRFProtect(app)


@app.context_processor
def inject_globals():
    lang = request.args.get('lang', 'en')
    if lang not in ('en', 'ar'):
        lang = 'en'
    return {
        'lang': lang,
        'is_ar': lang == 'ar',
        't': TRANSLATIONS[lang],
        'FIREBASE_API_KEY': os.environ.get('FIREBASE_API_KEY', ''),
        'FIREBASE_AUTH_DOMAIN': os.environ.get('FIREBASE_AUTH_DOMAIN', ''),
        'FIREBASE_PROJECT_ID': os.environ.get('FIREBASE_PROJECT_ID', ''),
        'FIREBASE_STORAGE_BUCKET': os.environ.get('FIREBASE_STORAGE_BUCKET', ''),
        'FIREBASE_MESSAGING_SENDER_ID': os.environ.get('FIREBASE_MESSAGING_SENDER_ID', ''),
        'FIREBASE_APP_ID': os.environ.get('FIREBASE_APP_ID', ''),
    }
DATABASE_URL = os.environ.get("DATABASE_URL")
USE_SQLITE = DATABASE_URL is None
SQLITE_PATH = "jobs.db"


def get_db():
    if 'db' not in g:
        if USE_SQLITE:
            conn = sqlite3.connect(SQLITE_PATH)
            conn.row_factory = sqlite3.Row
        else:
            conn = psycopg2.connect(DATABASE_URL)
        g.db = conn
    return g.db


@app.teardown_appcontext
def close_db(e=None):
    db = g.pop('db', None)
    if db:
        db.close()


def query(sql, params=None):
    conn = get_db()
    if USE_SQLITE:
        sql = sql.replace('%s', '?').replace('ILIKE', 'LIKE')
        cur = conn.cursor()
        cur.execute(sql, params or [])
        return [dict(zip([d[0] for d in cur.description], row)) for row in cur.fetchall()]
    else:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(sql, params or [])
        return cur.fetchall()


def query_one(sql, params=None):
    conn = get_db()
    if USE_SQLITE:
        sql = sql.replace('%s', '?').replace('ILIKE', 'LIKE')
        cur = conn.cursor()
        cur.execute(sql, params or [])
        row = cur.fetchone()
        if row:
            return dict(zip([d[0] for d in cur.description], row))
        return None
    else:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(sql, params or [])
        return cur.fetchone()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function


@app.route('/health')
def health():
    return "OK"


@app.route('/')
def index():
    try:
        category = request.args.get('category', '').strip()
        
        if category:
            latest = query("SELECT * FROM jobs WHERE category = %s ORDER BY scraped_at DESC LIMIT 20", [category])
            hot = query("SELECT * FROM jobs WHERE skills IS NOT NULL AND skills != '' AND category = %s ORDER BY LENGTH(skills) DESC LIMIT 10", [category])
            top_paying = query("SELECT * FROM jobs WHERE salary IS NOT NULL AND salary != 'Confidential' AND salary != '' AND salary != 'Not specified' AND LOWER(salary) NOT LIKE %s AND category = %s ORDER BY scraped_at DESC LIMIT 10", ['%kpi%', category])
            total_result = query_one("SELECT COUNT(*) as count FROM jobs WHERE category = %s", [category])
        else:
            latest = query("SELECT * FROM jobs ORDER BY scraped_at DESC LIMIT 20")
            hot = query("SELECT * FROM jobs WHERE skills IS NOT NULL AND skills != '' ORDER BY LENGTH(skills) DESC LIMIT 10")
            top_paying = query("SELECT * FROM jobs WHERE salary IS NOT NULL AND salary != 'Confidential' AND salary != '' AND salary != 'Not specified' AND LOWER(salary) NOT LIKE %s ORDER BY scraped_at DESC LIMIT 10", ['%kpi%'])
            total_result = query_one("SELECT COUNT(*) as count FROM jobs")
        
        overall_total_result = query_one("SELECT COUNT(*) as count FROM jobs")
        overall_total = overall_total_result['count'] if overall_total_result else 0
        
        categories = query("SELECT category, COUNT(*) as count FROM jobs GROUP BY category ORDER BY count DESC")
        total = total_result['count'] if total_result else 0
    except Exception as e:
        return f"Database error: {e}", 500

    return render_template('index.html', jobs=latest, hot_jobs=hot, top_paying=top_paying, categories=categories, total=total, overall_total=overall_total, selected_category=category)

@app.route('/search')
@limiter.limit("30 per minute")
def search():
    try:
        q = request.args.get('q', '').strip()
        category = request.args.get('category', '').strip()
        page = max(1, int(request.args.get('page', 1)))
        per_page = 20
        offset = (page - 1) * per_page

        where = "WHERE 1=1"
        params = []

        if q:
            where += " AND (title ILIKE %s OR company ILIKE %s OR skills ILIKE %s OR description ILIKE %s)"
            params += [f'%{q}%', f'%{q}%', f'%{q}%', f'%{q}%']
        if category:
            where += " AND category = %s"
            params.append(category)

        total_result = query_one(f"SELECT COUNT(*) as count FROM jobs {where}", params)
        total = total_result['count'] if total_result else 0
        jobs = query(f"SELECT * FROM jobs {where} ORDER BY scraped_at DESC LIMIT %s OFFSET %s", params + [per_page, offset])
        categories = query("SELECT category, COUNT(*) as count FROM jobs GROUP BY category ORDER BY count DESC")
        total_pages = math.ceil(total / per_page) if total > 0 else 1
    except Exception as e:
        return f"Search error: {e}", 500

    return render_template('search.html', jobs=jobs, q=q, category=category,
                           page=page, total=total, total_pages=total_pages,
                           categories=categories)


@app.route('/job/<int:job_id>')
def job_detail(job_id):
    job = query_one("SELECT * FROM jobs WHERE id = %s", (job_id,))
    if not job:
        return "Job not found", 404
    return render_template('job.html', job=job)


@app.route('/apply/<int:job_id>')
def apply(job_id):
    job = query_one("SELECT link FROM jobs WHERE id = %s", (job_id,))
    if job:
        return redirect(job['link'])
    return "Not found", 404


@app.route('/career-advice')
def career_advice():
    return render_template('career-advice.html')



@app.route('/login')
def login_page():
    return render_template('login.html')




@app.route('/signup')
def signup_page():
    return render_template('signup.html')


@app.route('/api/auth/session', methods=['POST'])
def api_set_session():
    data = request.get_json()
    session['user'] = {
        'uid': data.get('uid'),
        'email': data.get('email'),
        'name': data.get('name', ''),
        'picture': data.get('picture', '')
    }
    return {'success': True}


@app.route('/api/auth/save-user', methods=['POST'])
def save_user():
    data = request.get_json()
    uid = data.get('uid')
    email = data.get('email')
    name = data.get('name', '')
    picture = data.get('picture', '')
    if not uid or not email:
        return {'success': False}, 400
    try:
        conn = get_db()
        cur = conn.cursor()
        if USE_SQLITE:
            cur.execute("INSERT OR IGNORE INTO users (uid, email, name, picture, created_at) VALUES (?, ?, ?, ?, datetime('now'))", [uid, email, name, picture])
        else:
            cur.execute("INSERT INTO users (uid, email, name, picture, created_at) VALUES (%s, %s, %s, %s, NOW()) ON CONFLICT (uid) DO UPDATE SET email=%s, name=%s, picture=%s", [uid, email, name, picture, email, name, picture])
        conn.commit()
        cur.close()
        return {'success': True}
    except Exception as e:
        print(f"Save user error: {e}")
        return {'success': False, 'error': str(e)}, 500

@app.route('/sitemap.xml')
def sitemap():
    return app.send_static_file('sitemap.xml')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)

# ─────────────────────────────────────────────
# JSON API  –  consumed by the Next.js frontend
# ─────────────────────────────────────────────

def _job_to_dict(job):
    """Normalise a DB row into the public API shape."""
    if job is None:
        return None
    d = dict(job)
    # Coerce None → ""  so the frontend never has to null-check strings
    for k in d:
        if d[k] is None:
            d[k] = ""
    return d


@app.route('/api/jobs')
@limiter.limit("60 per minute")
def api_jobs():
    """
    GET /api/jobs
    Query params:
      q          – keyword search (title / company / skills / description)
      category   – exact category name
      location   – partial location match
      experience – partial experience match
      career_level – partial career level match
      page       – page number (default 1)
      per_page   – results per page (default 20, max 50)
      sort       – newest | salary  (default: newest)
    """
    try:
        q            = request.args.get('q', '').strip()
        category     = request.args.get('category', '').strip()
        location     = request.args.get('location', '').strip()
        experience   = request.args.get('experience', '').strip()
        career_level = request.args.get('career_level', '').strip()
        page         = max(1, int(request.args.get('page', 1)))
        per_page     = min(50, max(1, int(request.args.get('per_page', 20))))
        sort         = request.args.get('sort', 'newest')
        offset       = (page - 1) * per_page

        where  = "WHERE 1=1"
        params = []

        if q:
            where  += " AND (title ILIKE %s OR company ILIKE %s OR skills ILIKE %s OR description ILIKE %s)"
            params += [f'%{q}%', f'%{q}%', f'%{q}%', f'%{q}%']
        if category:
            where  += " AND category = %s"
            params.append(category)
        if location:
            where  += " AND location ILIKE %s"
            params.append(f'%{location}%')
        if experience:
            where  += " AND experience ILIKE %s"
            params.append(f'%{experience}%')
        if career_level:
            where  += " AND career_level ILIKE %s"
            params.append(f'%{career_level}%')

        order = "ORDER BY scraped_at DESC"
        if sort == 'salary':
            # Surface jobs that have a real salary value first
            order = "ORDER BY CASE WHEN salary IS NULL OR salary='' OR LOWER(salary)='confidential' OR LOWER(salary)='not specified' THEN 1 ELSE 0 END, scraped_at DESC"

        total_result = query_one(f"SELECT COUNT(*) as count FROM jobs {where}", params)
        total        = total_result['count'] if total_result else 0
        jobs         = query(f"SELECT * FROM jobs {where} {order} LIMIT %s OFFSET %s", params + [per_page, offset])

        total_pages = math.ceil(total / per_page) if total > 0 else 1

        return jsonify({
            'jobs':        [_job_to_dict(j) for j in jobs],
            'total':       total,
            'page':        page,
            'per_page':    per_page,
            'total_pages': total_pages,
        })
    except Exception as e:
        logging.exception("api_jobs error")
        return jsonify({'error': str(e)}), 500


@app.route('/api/jobs/featured')
@limiter.limit("60 per minute")
def api_jobs_featured():
    """
    GET /api/jobs/featured
    Returns up to 6 recently-scraped jobs with a description and skills.
    No auth required.
    """
    try:
        jobs = query(
            "SELECT * FROM jobs "
            "WHERE description IS NOT NULL AND description != '' "
            "  AND skills     IS NOT NULL AND skills     != '' "
            "ORDER BY scraped_at DESC LIMIT 6"
        )
        return jsonify({'jobs': [_job_to_dict(j) for j in jobs]})
    except Exception as e:
        logging.exception("api_jobs_featured error")
        return jsonify({'error': str(e)}), 500


@app.route('/api/jobs/<int:job_id>')
@limiter.limit("120 per minute")
def api_job_detail(job_id):
    """GET /api/jobs/:id"""
    try:
        job = query_one("SELECT * FROM jobs WHERE id = %s", (job_id,))
        if not job:
            return jsonify({'error': 'Not found'}), 404
        return jsonify({'job': _job_to_dict(job)})
    except Exception as e:
        logging.exception("api_job_detail error")
        return jsonify({'error': str(e)}), 500


@app.route('/api/jobs/<int:job_id>/related')
@limiter.limit("60 per minute")
def api_job_related(job_id):
    """GET /api/jobs/:id/related — up to 3 jobs in the same category"""
    try:
        source = query_one("SELECT category FROM jobs WHERE id = %s", (job_id,))
        if not source:
            return jsonify({'jobs': []})
        jobs = query(
            "SELECT * FROM jobs WHERE category = %s AND id != %s ORDER BY scraped_at DESC LIMIT 3",
            [source['category'], job_id]
        )
        return jsonify({'jobs': [_job_to_dict(j) for j in jobs]})
    except Exception as e:
        logging.exception("api_job_related error")
        return jsonify({'error': str(e)}), 500


@app.route('/api/categories')
@limiter.limit("30 per minute")
def api_categories():
    """GET /api/categories — all categories with job counts"""
    try:
        cats = query("SELECT category, COUNT(*) as count FROM jobs GROUP BY category ORDER BY count DESC")
        return jsonify({'categories': [dict(c) for c in cats]})
    except Exception as e:
        logging.exception("api_categories error")
        return jsonify({'error': str(e)}), 500


@app.route('/api/stats')
@limiter.limit("30 per minute")
def api_stats():
    """GET /api/stats — headline numbers for the hero section"""
    try:
        total   = query_one("SELECT COUNT(*) as count FROM jobs")
        cats    = query_one("SELECT COUNT(DISTINCT category) as count FROM jobs")
        companies = query_one("SELECT COUNT(DISTINCT company) as count FROM jobs")
        return jsonify({
            'total_jobs':       total['count']     if total     else 0,
            'total_categories': cats['count']      if cats      else 0,
            'total_companies':  companies['count'] if companies else 0,
        })
    except Exception as e:
        logging.exception("api_stats error")
        return jsonify({'error': str(e)}), 500
