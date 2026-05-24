# sitemap.py
import sqlite3

DB_PATH = "jobs.db"
BASE_URL = "https://tawtheef-egypt.onrender.com"  # Update after deploy

def generate_sitemap():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    urls = []
    
    # Homepage
    urls.append(f"""  <url>
    <loc>{BASE_URL}/</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>""")
    
    # Search page
    urls.append(f"""  <url>
    <loc>{BASE_URL}/search</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>""")
    
    # Category pages
    c.execute("SELECT DISTINCT category FROM jobs")
    for row in c.fetchall():
        cat = row[0]
        urls.append(f"""  <url>
    <loc>{BASE_URL}/search?category={cat}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>""")
    
    # Job pages
    c.execute("SELECT id FROM jobs")
    for row in c.fetchall():
        job_id = row[0]
        urls.append(f"""  <url>
    <loc>{BASE_URL}/job/{job_id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>""")
    
    conn.close()
    
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>"""
    
    with open("static/sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap)
    
    print(f"[✓] Sitemap generated with {len(urls)} URLs")

if __name__ == "__main__":
    generate_sitemap()