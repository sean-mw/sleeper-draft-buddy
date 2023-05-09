# Sleeper Draft Buddy

A command-line interface (CLI) tool designed to assist with fantasy football drafts on Sleeper. It provides live draft recommendations based on Underdog Fantasy NFL rankings and real-time draft data from the Sleeper API.

# Data Setup

The following steps are required for the application to work:

1. Download the Underdog Fantasy rankings CSV from [underdogfantasy.com/rankings/nfl](https://underdogfantasy.com/rankings/nfl). You will need an Underdog Fantasy account to access this page. It is free to create one, and you do not need to deposit any money to access the rankings.

2. Place the dowloaded CSV file in the data directory at `data/rankings.csv` in the project root. You will need to create the `data/` folder and rename the downloaded CSV to `rankings.csv`.

Now the application will have the ability to recommend draft picks based on these rankings.

# Usage

<ol>
    <li>
        Start the application with `python cli.py`.
        <br/>
        <img 
            src="readme_images/start_cli.png" 
            alt="Start CLI Screenshot" 
            width=20% 
            height=20%
        />
    </li>
    <li>
        Enter your Sleeper draft ID. This can be found in the URL to your Sleeper draft.
        <br/>
        <img 
            src="readme_images/sleeper_draft_id.png" 
            alt="Start CLI Screenshot" 
            width=50% 
            height=50%
        />
    </li>
    <li>
        You're done! The player suggestions will update every 10 seconds, and will not include any players that have already been picked in the draft.
        <br/>
        <img 
            src="readme_images/pick_suggestions.png" 
            alt="Start CLI Screenshot" 
            width=30% 
            height=30%
        />
    </li>
</ol>

