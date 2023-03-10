# ####################################################################################################################
# Eva Malpaya
# CS 361, Oregon State University
# Assignment 8
# February 13, 2023
#
# Random City Generator
# Simple HTTP/1.0 server that waits for client connections, reads the request string, generates a random city name,
# sends the city name as an HTTP-formatted string in the response body, then closes the client connection.
# ####################################################################################################################

# Citation for overall HTTP server code:
# Date: 2/12/2023
# Adapted from:
# https://www.codementor.io/@joaojonesventura/building-a-basic-http-server-from-scratch-in-python-1cedkg0842

from socket import *
import time
import random

# Citation for list of cities:
# Date: 2/12/2023
# Obtained from:
# https://www.majorcitiesofworld.com/list-of-cities-in-united-states-of-america/
listCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia',
              'Phoenix', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco',
              'Indianapolis', 'Columbus', 'Fort Worth', 'Charlotte', 'Seattle', 'Denver', 'El Paso',
              'Detroit', 'Washington', 'Boston', 'Memphis', 'Nashville', 'Portland', 'Oklahoma City',
              'Las Vegas', 'Baltimore', 'Louisville', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno',
              'Sacramento', 'Kansas City', 'Long Beach', 'Mesa', 'Atlanta', 'Colorado Springs',
              'Virginia Beach', 'Raleigh', 'Omaha', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa',
              'Wichita', 'New Orleans', 'Arlington', 'Cleveland', 'Bakersfield', 'Tampa', 'Aurora',
              'Honolulu', 'Anaheim', 'Santa Ana', 'Corpus Christi', 'Riverside', 'St. Louis',
              'Lexington', 'Stockton', 'Pittsburgh', 'Saint Paul', 'Anchorage', 'Cincinnati',
              'Henderson', 'Greensboro', 'Plano', 'Newark', 'Toledo', 'Lincoln', 'Orlando',
              'Chula Vista', 'Jersey City', 'Chandler', 'Fort Wayne', 'Buffalo', 'Durham',
              'St. Petersburg', 'Irvine', 'Laredo', 'Lubbock', 'Madison', 'Gilbert', 'Norfolk',
              'Reno', 'Winston-Salem', 'Glendale', 'Hialeah', 'Garland', 'Scottsdale',
              'Irving', 'Chesapeake', 'North Las Vegas', 'Fremont', 'Baton Rouge', 'Richmond',
              'Boise', 'San Bernardino', 'Spokane', 'Birmingham', 'Modesto', 'Des Moines',
              'Rochester', 'Tacoma', 'Fontana', 'Oxnard', 'Moreno Valley', 'Fayetteville',
              'Huntington Beach', 'Yonkers', 'Glendale', 'Montgomery', 'Columbus', 'Amarillo',
              'Little Rock', 'Akron', 'Shreveport', 'Augusta', 'Grand Rapids', 'Mobile',
              'Salt Lake City', 'Huntsville', 'Tallahassee', 'Grand Prairie', 'Overland Park',
              'Knoxville', 'Worcester', 'Brownsville', 'Newport News', 'Santa Clarita',
              'Port St. Lucie', 'Providence', 'Fort Lauderdale', 'Chattanooga', 'Tempe',
              'Oceanside', 'Garden Grove', 'Rancho Cucamonga', 'Cape Coral', 'Santa Rosa',
              'Vancouver', 'Sioux Falls', 'Peoria', 'Ontario', 'Jackson', 'Elk Grove',
              'Springfield', 'Pembroke Pines', 'Salem', 'Corona', 'Eugene', 'McKinney', 'Fort Collins',
              'Lancaster', 'Cary', 'Palmdale', 'Hayward', 'Salinas', 'Frisco', 'Springfield',
              'Pasadena', 'Macon', 'Alexandria', 'Pomona', 'Lakewood', 'Sunnyvale', 'Escondido',
              'Kansas City', 'Hollywood', 'Clarksville', 'Torrance', 'Rockford', 'Joliet', 'Paterson',
              'Bridgeport', 'Naperville', 'Savannah', 'Mesquite', 'Syracuse', 'Pasadena', 'Orange',
              'Fullerton', 'Killeen', 'Dayton', 'McAllen', 'Bellevue', 'Miramar', 'Hampton',
              'West Valley City', 'Warren', 'Olathe', 'Columbia', 'Thornton', 'Carrollton', 'Midland',
              'Charleston', 'Waco', 'Sterling Heights', 'Denton', 'Cedar Rapids', 'New Haven',
              'Roseville', 'Gainesville', 'Visalia', 'Coral Springs', 'Thousand Oaks', 'Elizabeth',
              'Stamford', 'Concord', 'Surprise', 'Lafayette', 'Topeka', 'Kent', 'Simi Valley',
              'Santa Clara', 'Murfreesboro', 'Hartford', 'Athens', 'Victorville', 'Abilene',
              'Vallejo', 'Berkeley', 'Norman', 'Allentown', 'Evansville', 'Columbia', 'Odessa',
              'Fargo', 'Beaumont', 'Independence', 'Ann Arbor', 'El Monte', 'Springfield', 'Round Rock',
              'Wilmington', 'Arvada', 'Provo', 'Peoria', 'Lansing', 'Downey', 'Carlsbad', 'Costa Mesa',
              'Miami Gardens', 'Westminster', 'Clearwater', 'Fairfield', 'Rochester', 'Elgin', 'Temecula',
              'West Jordan', 'Inglewood', 'Richardson', 'Lowell', 'Gresham', 'Antioch', 'Cambridge',
              'High Point', 'Billings', 'Manchester', 'Murrieta', 'Centennial', 'Richmond', 'Ventura',
              'Pueblo', 'Pearland', 'Waterbury', 'West Covina', 'North Charleston', 'Everett', 'College Station',
              'Palm Bay', 'Pompano Beach', 'Boulder', 'Norwalk', 'West Palm Beach', 'Broken Arrow',
              'Daly City', 'Sandy Springs', 'Burbank', 'Green Bay', 'Santa Maria', 'Wichita Falls', 'Lakeland',
              'Clovis', 'Lewisville', 'Tyler', 'El Cajon', 'San Mateo', 'Rialto', 'Edison', 'Davenport',
              'Hillsboro', 'Woodbridge', 'Las Cruces', 'South Bend', 'Vista', 'Greeley', 'Davie',
              'San Angelo', 'Jurupa Valley', 'Renton']


def main():
    SERVER_HOST = '0.0.0.0'
    SERVER_PORT = 8000

    serverSocket = socket(AF_INET, SOCK_STREAM)
    # serverSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    serverSocket.bind((SERVER_HOST, SERVER_PORT))

    print('Random City Generator listening on port: ' + str(SERVER_PORT))
    serverSocket.listen(1)

    while True:
        connectionSocket, addr = serverSocket.accept()
        # print('Connected by ' + str(addr) + '')

        data = connectionSocket.recv(1024).decode()

        city = random.choice(listCities)

        print('Sending: ' + city)

        # Citation for HTTP response build:
        # Date: 2/12/2023
        # Adapted from:
        # https://stackoverflow.com/questions/36122461/trying-to-send-http-response-from-low-level-socket-server

        msg = city + '\n'

        response_headers = {
            'Content-Type': 'text/html; encoding=utf8',
            'Content-Length': len(msg),
            'Connection': 'close',
            'Access-Control-Allow-Origin': '*'
        }

        response_headers_raw = ''.join('%s: %s\r\n' % (
            k, v) for k, v in response_headers.items())

        response_proto = 'HTTP/1.1'
        response_status = '200'
        response_status_text = 'OK'

        # build HTTP response
        r = '%s %s %s\r\n' % (
            response_proto, response_status, response_status_text)
        connectionSocket.send(r.encode(encoding="utf-8"))
        connectionSocket.send(response_headers_raw.encode(encoding="utf-8"))
        # separate headers from body
        connectionSocket.send('\r\n'.encode(encoding="utf-8"))
        connectionSocket.send(msg.encode(encoding="utf-8"))
        connectionSocket.close()

    serverSocket.close()


if __name__ == "__main__":
    main()
