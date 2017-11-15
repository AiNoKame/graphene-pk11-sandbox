graphene-pk11 API
=================
https://github.com/PeculiarVentures/graphene/blob/72821fc2f065309a32b9a959dd0876c3106998c5/index.d.ts

Configs for different HSM providers
===================================

**Thales - nShield Connect**

Sample:
https://github.com/PeculiarVentures/graphene/blob/56bb5b4bdfb18ecefd6f2be931feb7fc11009aed/vendor/ThalesNShield-config.json
```
HSM_LIB_FILE: '/opt/nfast/toolkits/pkcs11/libcknfast.so',
HSM_LIB_NAME: 'Thales NShield',
HSM_SLOT_INDEX: 1
```

**Gemalto - SafeNet Luna**

Sample:
https://github.com/PeculiarVentures/graphene/blob/788e58a2921870a00eb520b0ff52e04db7ba8db7/vendor/safenet-config.json
```
HSM_LIB_FILE: '/usr/safenet/lunaclient/lib/libCryptoki2_64.so',
HSM_LIB_NAME: 'Safenet Luna',
HSM_SLOT_INDEX: 0
```

**SoftHSM (for testing)**

Sample:
https://github.com/PeculiarVentures/graphene/blob/788e58a2921870a00eb520b0ff52e04db7ba8db7/vendor/softhsm-config.json

```
HSM_LIB_FILE: '/usr/local/lib/softhsm/libsofthsm2.so',
HSM_LIB_NAME: 'SoftHSM',
HSM_SLOT_INDEX: 0
```

Setup
=====

How to set up SoftHSM on Mac OS X:

https://wiki.opendnssec.org/display/SoftHSMDOCS/SoftHSM+Documentation+v2

How to set up OpenSC tools (specifically pkcs11-tool) on Mac OS X:
https://github.com/OpenSC/OpenSC/wiki/macOS-Quick-Start

After installation, run these SoftHSM commands to initialize a token in slot 0
and insert a private key

1) Initialize token
```
> softhsm2-util --init-token --slot 0 --label "test"

=== SO PIN (4-255 characters) ===
Please enter SO PIN: **** (1234)
Please reenter SO PIN: **** (1234)
=== User PIN (4-255 characters) ===
Please enter user PIN: **** (9876)
Please reenter user PIN: **** (9876)
The token has been initialized and is reassigned to slot 686818919
```

Two options from here to insert the private key:

2a - Use pkcs11-tool to generate a public/private key pair directly into token

2b - Use softhsm2-util to import a private key that's been converted to PKCS#8 format

2a) Generate private key in token
```
> pkcs11-tool --module=/usr/local/lib/softhsm/libsofthsm2.so -l -k \
-d abcd1234 -a provider-ripple-connect-key --key-type rsa:2048

Using slot 0 with a present token (0x28f00667)
Logging in to "test".
Please enter User PIN:
Key pair generated:
Private Key Object; RSA
  label:      provider-ripple-connect-key
  ID:         abcd1234
  Usage:      decrypt, sign, unwrap
Public Key Object; RSA 2048 bits
  label:      provider-ripple-connect-key
  ID:         abcd1234
  Usage:      encrypt, verify, wrap
```

2b-0) Convert regular PEM formatted private key to PKCS#8 format
(doesn't seem to be fetchable on SoftHSM)
```
> openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt \
-in /Users/rod/Documents/GitHub/ripple-solution/shared/test-certs/provider-ripple-connect-key.pem \
-out /Users/rod/Documents/GitHub/SoftHSMv2/provider-ripple-connect-key.pem
```

2b-1) Import private key into token
(note the slot from the output of step 1, which is used in --slot param)
```
> softhsm2-util \
--import /Users/rod/Documents/GitHub/SoftHSMv2/provider-ripple-connect-key.pem \
--no-public-key \
--slot 686818919 --label "provider-ripple-connect-key" --id abcd1234 --pin 9876
```

The key pair has been imported.

x) Show Slots (optional)
```
> softhsm2-util --show-slots
```
or
```
> pkcs11-tool --module=/usr/local/lib/softhsm/libsofthsm2.so -l -O
```

x) Delete Token (optional)
```
> softhsm2-util --delete-token --token "test"
```

conf lives at `/etc/softhsm2.conf`

tokens live at `/var/lib/softhsm/tokens`
