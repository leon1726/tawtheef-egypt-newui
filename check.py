import sqlite3
conn = sqlite3.connect('jobs.db')
r = conn.execute('SELECT description FROM jobs WHERE description != "" LIMIT 1').fetchone()
print(r)import sqlite3
conn = sqlite3.connect('jobs.db')
c = conn.cursor()
c.execute("SELECT id, salary FROM jobs WHERE salary LIKE '%net%' OR salary LIKE '%kpi%' LIMIT 5")
for r in c.fetchall():
    print(f"ID: {r[0]}, Salary: [{r[1]}]")
conn.close()