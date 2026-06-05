import sqlite3
conn = sqlite3.connect('jobs.db')
conn.execute("DELETE FROM jobs WHERE category='General'")
conn.commit()
print(f'Deleted {conn.total_changes} jobs')
conn.close()