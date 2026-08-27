import requests # type: ignore
from bs4 import BeautifulSoup as bs # type: ignore
import csv
import shutil
from datetime import datetime
from urllib.parse import urljoin


# Get all URL links from urlList.txt
links = []
with open("clubsList.txt", "r") as inputFile:
    links = inputFile.readlines()
    
data = []
id = 0
code = 111111


# Get Links Content
for link in links:
    link = link.strip()
    res = requests.get(link)
    soup = bs(res.content, 'html.parser')

    # club ID
    id += 1
    
    # Club Name
    clubName = (soup.find("a", class_="text-base font-medium text-gray-900 hover:text-gray-700 line-clamp-2 leading-tight")).text.strip()

    # Club Acronym
    # null

    # Club Hex Code
    hexcode = "#" + str(code)
    code += 100

    # ClubLogo
    images = soup.find_all("img")
    imageURL = images[2].attrs['src']
    
    path = "../../src/assets/clubs/logos/" + clubName + "_Logo.jpg"
    cleanPathLogo = path.replace(" ", "")
    cleanPathLogo = cleanPathLogo.replace(":", "_")

    r = requests.get(imageURL, stream=True)
    if r.status_code == 200:
        with open(cleanPathLogo, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)

            
    banner = soup.select_one("img.w-full.object-cover")
    bannerURL = None
    if banner:
        imageSource = banner.get("src") or banner.get("data-src")
        if imageSource:
            bannerURL = urljoin(res.url, imageSource)
    else:
        print("Banner image not found:", res.url)

    path = "../../src/assets/clubs/banners/" + clubName + "_Banner.jpg"
    cleanPathBanner = path.replace(" ", "")
    cleanPathBanner = cleanPathBanner.replace(":", "_")

    if bannerURL:
        r = requests.get(bannerURL, stream=True)
        if r.status_code == 200:
            with open(cleanPathBanner, 'wb') as f:
                r.raw.decode_content = True
                shutil.copyfileobj(r.raw, f)

    # club Description
    tag = soup.find("div", class_="text detail-description")
    if tag:
        tempDesc = tag.text.strip()
        tempDesc = tempDesc.replace("\r\n", "\n").replace("\r", "\n")
        tempDesc = tempDesc.replace("\n", "\\n")
    else: 
        tempDesc = "Null"


    row = [f"{id:05}", clubName, None, hexcode, cleanPathLogo, True, hexcode, None, None, 2000, cleanPathBanner]
    data.append(row)


headers = ["id","name","acronym","hexCode","logoURL", "isActive", "description","createdAt","keyEvent","foundingYear","bannerURL"]

with open('clubs.csv', "w", newline='', encoding="utf-8") as file:
    content = csv.writer(file, delimiter=',', quotechar='"')
    content.writerow(headers)
    content.writerows(data)
