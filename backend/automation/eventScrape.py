import requests # type: ignore
from bs4 import BeautifulSoup as bs # type: ignore
import shutil
from datetime import datetime

def scrape(link, clubID):
    res = requests.get(link)
    soup = bs(res.content, 'html.parser')

    with open("scrapedContent.html", "w", encoding="utf-8") as file:
        file.write(soup.prettify())

    # Event Title
    tempTitle = (soup.find("h1", class_="title")).text.strip()
    tempTitle = tempTitle.translate(str.maketrans("", "", "|()"))
    tempTitle = tempTitle.replace("/", "_")
    tempTitle = tempTitle.replace("?", "")


    # Event Date and Time
    content = soup.find("div", class_="col-sm-7 col-md-6 col-md-offset-1")
    tempTimeALL = []
    if content:
        for text in content.find_all('div'):
            tempTimeALL.append(text.text)

    tempDate = tempTimeALL[0]
    dateObject = datetime.strptime(tempDate, "%a, %d %b %Y")
    tempDate = dateObject.strftime("%d_%b_%Y")
    
    if len(tempTimeALL) == 3:
        tempStarts = tempTimeALL[1]
        tempEnds = tempTimeALL[2]
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
    tempImage = soup.find_all("img")
    imageURL = tempImage[1].attrs['src']
    
    # print(imageURL)

    path = "../../src/assets/eventImages/" + tempTitle + "_" + tempDate + ".jpg"
    cleanPath = path.replace(" ", "")
    cleanPath = cleanPath.replace(":", "_")

    # print(cleanPath)

    r = requests.get(imageURL, stream=True)
    if r.status_code == 200:
        with open(cleanPath, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)


    # Event Link
    tempLink = link.replace("\n", "")

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
    