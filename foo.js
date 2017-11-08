const graphene = require('graphene-pk11')

const mod = graphene.Module.load('/usr/local/lib/softhsm/libsofthsm2.so', 'SoftHSM')

mod.initialize()

const session = mod.getSlots(0).open(4)

session.login('9876')

const fetchedCertificates = session.find({label: 'provider-ripple-connect-key'})

const certificate = fetchedCertificates.items(0).toType()

console.log(`======= certificate: `, certificate)
console.log(`======= Object.getOwnPropertyNames(certificate): `, Object.getOwnPropertyNames(certificate))
console.log(`======= certificate.lib: `, certificate.lib)
console.log(`======= certificate.handle: `, certificate.handle)
console.log(`======= certificate.handle.toString('hex'): `, certificate.handle.toString('hex'))
console.log(`======= certificate.id.toString('hex'): `, certificate.id.toString('hex'))
console.log(`======= certificate.label: `, certificate.label)
console.log(`======= certificate.subject: `, certificate.subject)
console.log(`======= certificate.value: `, certificate.value)

mod.finalize()
