'use strict'

const {get} = require('./get_certificate')

const secretsManagement = {
  HSM_LIB_FILE: '/usr/local/lib/softhsm/libsofthsm2.so',
  HSM_LIB_NAME: 'SoftHSM',
  HSM_SLOT_INDEX: 0,
  // HSM_USER_PIN set up in step 5 of
  // https://wiki.opendnssec.org/display/SoftHSMDOCS/SoftHSM+Documentation+v2
  HSM_USER_PIN: '9876'
}

const fetchedCertificates = get(secretsManagement,
  'provider-ripple-connect-key')

console.log('\n\n==== fetchedCertificates length', fetchedCertificates.length)
console.log('\n\n==== fetchedCertificates', JSON.stringify(
  fetchedCertificates, null, 2))
