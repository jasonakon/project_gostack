import requests
import facebook

##########
# Notes:
# Documentation: https://facebook-sdk.readthedocs.io/en/latest/api.html
#                https://developers.facebook.com/docs/graph-api/reference/place-information/
#                https://medium.com/@DrGabrielA81/python-how-making-facebook-api-calls-using-facebook-sdk-ea18bec973c8
# Only overall ratings / places are availables -> no ratings


fb_app_id = '1899615110320156'
fb_app_secret = '0068f0d9b693d5505b04c9f7925c5993'
fb_access_token = "EAAaZCsJvcUBwBAEUmSSVAZAMHZCy9xyv9ZBNFEaCGQm21si6pXUsuCwUdCnIXztBfYIQB3ZC8XdbUUsAznrsiGolfDCeeNtZCdi6WZADESt58BjiomVCskojsHSogk4UavPOH6HYziPqrWdT6NkLMDvKOrp80UJHlMZD"

access_token_url = "https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id={}&client_secret={}&fb_exchange_token={}".format(fb_app_id, fb_app_secret, fb_access_token)

r = requests.get(access_token_url)
access_token_info = r.json()
user_long_token = access_token_info['access_token']
#print(access_token_info)

graph = facebook.GraphAPI(access_token=user_long_token, version="3.1")

# Search for IDs and nearby locations on giving coordinates:
places = graph.search(type='place',
                      center='5.415897, 100.340137',
                      fields='name,location,checkins')

#for place in places['data']:
#    print('Name: %s ID: %s Checkins: %s' % (place['name'].encode(),place['id'],place['checkins']))

# Gather all details from a fixed location
china_house = graph.get_object(id='471624852925300',
                                fields='name,checkins,hours,app_links,price_range,phone,rating_count,engagement')

print('Name: %s Engageement: %s Ratings: %s' % (china_house['name'], china_house['engagement'], china_house['rating_count']))