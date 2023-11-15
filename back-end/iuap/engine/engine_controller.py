# engine_controller.py

import os
import time
from .engine_virustotal.vt_call import vt_call
from .engine_kisa.kisa_call import kisa_call
from .engine_urlscanio.urlscanio_call import call

vt_key = os.environ.get('VIRUSTOTAL_API_KEY')
scan_io_api_key = os.environ.get('SCAN_IO_API_KEY')

def engine_call(id, url):
  print(f"Engine - report({id}) - url({url})")
  
  vt_data = vt_call(vt_key, url)
  time.sleep(3)
  kisa_data = kisa_call(url)
  time.sleep(3)
  
  
  return {
    "vt_data": vt_data,
    "kisa_data": kisa_data,
  }