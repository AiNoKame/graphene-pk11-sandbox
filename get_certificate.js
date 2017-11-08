'use strict'

const graphene = require('graphene-pk11')
const {parseCertificate} = require('./parse_certificate')

function get(secretsManagement, label) {
  const {
    HSM_LIB_FILE: libFile,
    HSM_LIB_NAME: libName,
    HSM_SLOT_INDEX: slotIndex,
    HSM_USER_PIN: userPIN
  } = secretsManagement

  const mod = graphene.Module.load(libFile, libName)

  mod.initialize()

  try {
    const session = mod.getSlots(slotIndex).open(4)

    session.login(userPIN)

    const fetchedCertificates = session.find({label})

    const parsedCertificates = parseCertificate(fetchedCertificates)

    mod.finalize()

    return parsedCertificates

  } catch (error) {
    console.error('ERROR', error)

    mod.finalize()
  }
}

module.exports = {
  get
}
