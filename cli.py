import os
import time
from datetime import datetime

from data import (
    get_sleeper_draft_picks, 
    get_underdog_rankings, 
    update_underdog_rankings, 
    print_top_underdog_rankings
)


def main():
    draft_id = input("Enter Draft ID: ")

    rankings = get_underdog_rankings()

    while (True):
        os.system("clear")

        picks = get_sleeper_draft_picks(draft_id)
        rankings = update_underdog_rankings(rankings, picks)

        if (len(picks) == 0):
            print("No pick data available for draft", draft_id)
            break
        
        now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        print(f"Pick Suggestions [{now}]", end="\n\n")
        print_top_underdog_rankings(rankings, 20)
        time.sleep(10)


if __name__ == "__main__":
    main()

