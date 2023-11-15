import requests
import json
import time

API_KEY = 'API KEY'
API_URL = 'https://urlscan.io/api/v1/'

def submit_url_and_get_scan_id(url):
    headers = {
        'Content-Type': 'application/json',
        'API-Key': API_KEY,
    }

    data = {
        'url': url,
        'public': 'on',
    }

    response = requests.post(f'{API_URL}scan/', json=data, headers=headers)

    if response.status_code == 200:
        scan_result = response.json()
        return scan_result['uuid']
    else:
        print(f"Error submitting URL: {response.status_code}")
        return None

def get_scan_result_by_id(scan_id):
    headers = {
        'Content-Type': 'application/json',
        'API-Key': API_KEY,
    }

    max_wait_time = 600
    start_time = time.time()

    while time.time() - start_time < max_wait_time:
        response = requests.get(f'{API_URL}result/{scan_id}/', headers=headers)

        if response.status_code == 200:
            scan_result = response.json()
            return scan_result
        elif response.status_code == 404:
            time.sleep(5)
        else:
            print(f"Error getting scan result: {response.status_code}")
            return None

    print("Max wait time exceeded. Scan result may not be available yet.")
    return None

def call(url):
    scan_id = submit_url_and_get_scan_id(url)

    if scan_id:
        print(f"Scan submitted successfully. Scan ID: {scan_id}")

        result = get_scan_result_by_id(scan_id)

        if result:
            return json.dumps(result)

    return None
