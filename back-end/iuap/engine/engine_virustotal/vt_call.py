import requests
import time

def scan_url(vt_api_key, target_url):
    url = "https://www.virustotal.com/api/v3/urls"
    headers = {"x-apikey": vt_api_key,}
    params = {"url": target_url,}

    response = requests.post(url, headers=headers, params=params)

    if response.status_code == 200:
        scan_result = response.json()
        return scan_result.get("data", {}).get("links").get("self")
    else:
        return None

def get_url(vt_api_key, scan_id):
    url = scan_id
    headers = {
        "x-apikey": vt_api_key,
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        report_data = response.json()
        return report_data
    else:
        return response

def vt_call(vt_api_key, target_url):
  time.sleep(20)
  return get_url(vt_api_key, scan_url(vt_api_key, target_url))