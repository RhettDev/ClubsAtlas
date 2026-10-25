#   File Name: eventScrape.py
#   Author: Rhett Bauchop - 20722517
#   Purpose: Intended to take a public TidyHQ page and scrape the event information required for an event on the ClubsAtlas
#            As of the 22nd of October, roughly a week before submission TidyHQ changed their platform making this scraper
#            outdated and no longer accurate. I personally do not have enough time to fix the issue, the file has been kept 
#            in tact to showcase the feature as it was.


import requests # type: ignore
from bs4 import BeautifulSoup as bs # type: ignore
import shutil
from datetime import datetime

def scrape(link, clubID):
    # Request the link provided by the clubs admin
    res = requests.get(link)

    # Parse the html into variable
    soup = bs(res.content, 'html.parser')

    # Save the html data to a file
    with open("scrapedContent.html", "w", encoding="utf-8") as file:
        file.write(soup.prettify())

    # Event Title
    # soup.find takes the class of an element type. title is the text in a <h1> type with class "title"
    tempTitle = (soup.find("h1", class_="title")).text.strip()
    tempTitle = tempTitle.translate(str.maketrans("", "", "|()"))
    tempTitle = tempTitle.replace("/", "_")
    tempTitle = tempTitle.replace("?", "")


    # Event Date and Time
    content = soup.find("div", class_="col-sm-7 col-md-6 col-md-offset-1")
    tempTimeALL = []
    if content:
        for text in content.find_all('div'):
            # Contains date and time
            tempTimeALL.append(text.text)

    tempDate = tempTimeALL[0] # Date is the first index
    # set exact data data for database upload
    dateObject = datetime.strptime(tempDate, "%a, %d %b %Y") 
    tempDate = dateObject.strftime("%Y-%m-%d")

    # If time is Data, start time, end time
    if len(tempTimeALL) == 3:
        tempStarts = tempTimeALL[1]
        tempEnds = tempTimeALL[2]
    # IF time is Date Start time, Date End time.
    # used in cases of multiday events
    else:
        tempTime = tempTimeALL[1].split("-")
        tempStarts = tempTime[0].strip()
        tempEnds = tempTime[1].strip()

    # Event Description
    tag = soup.find("div", class_="text detail-description")
    if tag:
        tempDesc = tag.text.strip()
        tempDesc = tempDesc.replace("\r\n", "\n").replace("\r", "\n")
        tempDesc = tempDesc.replace("\n", "\\n")
    else: 
        tempDesc = "Null"

    # Event Location
    tag = soup.find("div", class_="location-name")
    if tag:
        tempLocal = tag.text.strip()
        tempLocal += " "
        tempLocal += (soup.find("div", class_="location-directions")).text.strip()
    else:
        tempLocal = "Null"


    # Event Image
    # Set image title 
    tempImage = soup.find_all("img")
    imageURL = tempImage[1].attrs['src']
    
    path = tempTitle + "_" + tempDate + ".jpg"
    cleanPath = path.replace(" ", "")
    cleanPath = cleanPath.replace(":", "_")

    # Get image data
    r = requests.get(imageURL, stream=True)
    if r.status_code == 200:
        with open(cleanPath, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)


    # Event Link
    tempLink = link.replace("\n", "")

    # Final data collection
    data = {
        "clubID": clubID,
        "title": tempTitle,
        "description": tempDesc,
        "location": tempLocal,
        "date": tempDate,
        "startTime": tempStarts,
        "endTime": tempEnds,
        "imagePath": cleanPath,
        "link": tempLink,
    }

    return data
    