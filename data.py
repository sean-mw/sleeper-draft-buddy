import requests
import pandas as pd


SLEEPER_BASE = "https://api.sleeper.app/v1"


def get_sleeper_draft_picks(draft_id):
    r = requests.get(SLEEPER_BASE + f"/draft/{draft_id}/picks")
    return r.json()


def get_underdog_rankings():
    df = pd.read_csv("data/rankings.csv")  
    records = df.to_dict("records")
    rankings = {}
    for player in records:
        first = player["firstName"].lower()
        last = player["lastName"].lower()
        position = player["slotName"].lower()
        rankings[f"{first} {last} {position}"] = player
    return rankings


def print_top_underdog_rankings(rankings, limit):
    top_rankings = list(rankings.values())[:limit]
    for player in top_rankings:
        first = player["firstName"]
        last = player["lastName"]
        position = player["slotName"]
        adp = player["adp"]
        print(f"[{position}] {first} {last} - ADP: {adp}")


def update_underdog_rankings(rankings, picks):
    for pick in picks:
        metadata = pick["metadata"]
        first = metadata["first_name"].lower()
        last = metadata["last_name"].lower()
        position = metadata["position"].lower()
        key = f"{first} {last} {position}"
        if key in rankings:
            del rankings[key]
    return rankings

