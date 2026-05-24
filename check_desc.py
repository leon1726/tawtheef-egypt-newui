import sqlite3
conn = sqlite3.connect('jobs.db')
c = conn.cursor()
c.execute('SELECT title, description FROM jobs ORDER BY id DESC LIMIT 1')
r = c.fetchone()
print('Title:', r[0])
desc = r[1] if r[1] else ''
print('Desc length:', len(desc))
print('First 300 chars:')
print(desc[:300])
conn.close()