'use strict'

const _ = require('lodash')
const graphene = require('graphene-pk11')

function parseCertificate(certificateList) {
  if (!certificateList.length) {
    throw new Error('Certificate list is empty - unable to parse')
  }

  return _.map(certificateList, (_sessionObject, index) => {
    const certificate = certificateList.items(index).toType()

    console.log(`\n\n======= (index ${index}) certificate: `, certificate)
    console.log(`\n\n======= (index ${index}) Object.getOwnPropertyNames(certificate): `, Object.getOwnPropertyNames(certificate))
    console.log(`\n\n======= (index ${index}) certificate.lib: `, certificate.lib)
    console.log(`\n\n======= (index ${index}) certificate.handle: `, certificate.handle)
    console.log(`\n\n======= (index ${index}) certificate.handle.toString('hex'): `, certificate.handle.toString('hex'))
    console.log(`\n\n======= (index ${index}) certificate.id.toString('hex'): `, certificate.id.toString('hex'))
    console.log(`\n\n======= (index ${index}) certificate.label: `, certificate.label)
    console.log(`\n\n======= (index ${index}) certificate.subject: `, certificate.subject)
    console.log(`\n\n======= (index ${index}) certificate.value: `, certificate.value)

    return certificate.session.handle.toString()
  })
}

module.exports = {
  parseCertificate
}
