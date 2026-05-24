from scrapper import WuzzufCategoryScraper

s = WuzzufCategoryScraper(headless=True)

print("=== DEEP CATEGORY SCRAPE (10 pages each) ===")
s.scrape_all_categories(max_pages=10)

print("\n=== GENERAL SEARCH (100 pages) ===")
s.scrape_general_search(max_pages=100)

print("\n=== DONE ===")