/* eslint-disable no-prototype-builtins, no-var */
import $protobuf from 'protobufjs/minimal'

// Common aliases
var $Reader = $protobuf.Reader; var $Writer = $protobuf.Writer; var $util = $protobuf.util

/**
 * Namespace googleauth.
 * @exports googleauth
 * @namespace
 */
var googleauth = {}

googleauth.MigrationPayload = (function () {
  /**
   * Properties of a MigrationPayload.
   * @memberof googleauth
   * @interface IMigrationPayload
   * @property {Array.<googleauth.MigrationPayload.IOtpParameters>|null} [otpParameters] MigrationPayload otpParameters
   * @property {number|null} [version] MigrationPayload version
   * @property {number|null} [batchSize] MigrationPayload batchSize
   * @property {number|null} [batchIndex] MigrationPayload batchIndex
   * @property {number|null} [batchId] MigrationPayload batchId
   */

  /**
   * Constructs a new MigrationPayload.
   * @memberof googleauth
   * @classdesc Represents a MigrationPayload.
   * @implements IMigrationPayload
   * @constructor
   * @param {googleauth.IMigrationPayload=} [properties] Properties to set
   */
  function MigrationPayload(properties) {
    this.otpParameters = []
    if (properties) {
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
        if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
      }
    }
  }

  /**
   * MigrationPayload otpParameters.
   * @member {Array.<googleauth.MigrationPayload.IOtpParameters>} otpParameters
   * @memberof googleauth.MigrationPayload
   * @instance
   */
  MigrationPayload.prototype.otpParameters = $util.emptyArray

  /**
   * MigrationPayload version.
   * @member {number} version
   * @memberof googleauth.MigrationPayload
   * @instance
   */
  MigrationPayload.prototype.version = 0

  /**
   * MigrationPayload batchSize.
   * @member {number} batchSize
   * @memberof googleauth.MigrationPayload
   * @instance
   */
  MigrationPayload.prototype.batchSize = 0

  /**
   * MigrationPayload batchIndex.
   * @member {number} batchIndex
   * @memberof googleauth.MigrationPayload
   * @instance
   */
  MigrationPayload.prototype.batchIndex = 0

  /**
   * MigrationPayload batchId.
   * @member {number} batchId
   * @memberof googleauth.MigrationPayload
   * @instance
   */
  MigrationPayload.prototype.batchId = 0

  /**
   * Creates a new MigrationPayload instance using the specified properties.
   * @function create
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {googleauth.IMigrationPayload=} [properties] Properties to set
   * @returns {googleauth.MigrationPayload} MigrationPayload instance
   */
  MigrationPayload.create = function create(properties) {
    return new MigrationPayload(properties)
  }

  /**
   * Encodes the specified MigrationPayload message. Does not implicitly {@link googleauth.MigrationPayload.verify|verify} messages.
   * @function encode
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {googleauth.IMigrationPayload} message MigrationPayload message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  MigrationPayload.encode = function encode(message, writer) {
    if (!writer) { writer = $Writer.create() }
    if (message.otpParameters != null && message.otpParameters.length) {
      for (var i = 0; i < message.otpParameters.length; ++i) {
        googleauth.MigrationPayload.OtpParameters.encode(message.otpParameters[i], writer.uint32(/* id 1, wireType 2 = */10).fork()).ldelim()
      }
    }
    if (message.version != null && Object.hasOwnProperty.call(message, 'version')) { writer.uint32(/* id 2, wireType 0 = */16).int32(message.version) }
    if (message.batchSize != null && Object.hasOwnProperty.call(message, 'batchSize')) { writer.uint32(/* id 3, wireType 0 = */24).int32(message.batchSize) }
    if (message.batchIndex != null && Object.hasOwnProperty.call(message, 'batchIndex')) { writer.uint32(/* id 4, wireType 0 = */32).int32(message.batchIndex) }
    if (message.batchId != null && Object.hasOwnProperty.call(message, 'batchId')) { writer.uint32(/* id 5, wireType 0 = */40).int32(message.batchId) }
    return writer
  }

  /**
   * Encodes the specified MigrationPayload message, length delimited. Does not implicitly {@link googleauth.MigrationPayload.verify|verify} messages.
   * @function encodeDelimited
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {googleauth.IMigrationPayload} message MigrationPayload message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  MigrationPayload.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim()
  }

  /**
   * Decodes a MigrationPayload message from the specified reader or buffer.
   * @function decode
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {googleauth.MigrationPayload} MigrationPayload
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  MigrationPayload.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
    var end = length === undefined ? reader.len : reader.pos + length; var message = new googleauth.MigrationPayload()
    while (reader.pos < end) {
      var tag = reader.uint32()
      switch (tag >>> 3) {
        case 1: {
          if (!(message.otpParameters && message.otpParameters.length)) { message.otpParameters = [] }
          message.otpParameters.push(googleauth.MigrationPayload.OtpParameters.decode(reader, reader.uint32()))
          break
        }
        case 2: {
          message.version = reader.int32()
          break
        }
        case 3: {
          message.batchSize = reader.int32()
          break
        }
        case 4: {
          message.batchIndex = reader.int32()
          break
        }
        case 5: {
          message.batchId = reader.int32()
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Decodes a MigrationPayload message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {googleauth.MigrationPayload} MigrationPayload
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  MigrationPayload.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
    return this.decode(reader, reader.uint32())
  }

  /**
   * Verifies a MigrationPayload message.
   * @function verify
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  MigrationPayload.verify = function verify(message) {
    if (typeof message !== 'object' || message === null) { return 'object expected' }
    if (message.otpParameters != null && message.hasOwnProperty('otpParameters')) {
      if (!Array.isArray(message.otpParameters)) { return 'otpParameters: array expected' }
      for (var i = 0; i < message.otpParameters.length; ++i) {
        var error = googleauth.MigrationPayload.OtpParameters.verify(message.otpParameters[i])
        if (error) { return `otpParameters.${error}` }
      }
    }
    if (message.version != null && message.hasOwnProperty('version')) {
      if (!$util.isInteger(message.version)) { return 'version: integer expected' }
    }
    if (message.batchSize != null && message.hasOwnProperty('batchSize')) {
      if (!$util.isInteger(message.batchSize)) { return 'batchSize: integer expected' }
    }
    if (message.batchIndex != null && message.hasOwnProperty('batchIndex')) {
      if (!$util.isInteger(message.batchIndex)) { return 'batchIndex: integer expected' }
    }
    if (message.batchId != null && message.hasOwnProperty('batchId')) {
      if (!$util.isInteger(message.batchId)) { return 'batchId: integer expected' }
    }
    return null
  }

  /**
   * Creates a MigrationPayload message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {googleauth.MigrationPayload} MigrationPayload
   */
  MigrationPayload.fromObject = function fromObject(object) {
    if (object instanceof googleauth.MigrationPayload) { return object }
    var message = new googleauth.MigrationPayload()
    if (object.otpParameters) {
      if (!Array.isArray(object.otpParameters)) { throw new TypeError('.googleauth.MigrationPayload.otpParameters: array expected') }
      message.otpParameters = []
      for (var i = 0; i < object.otpParameters.length; ++i) {
        if (typeof object.otpParameters[i] !== 'object') { throw new TypeError('.googleauth.MigrationPayload.otpParameters: object expected') }
        message.otpParameters[i] = googleauth.MigrationPayload.OtpParameters.fromObject(object.otpParameters[i])
      }
    }
    if (object.version != null) { message.version = object.version | 0 }
    if (object.batchSize != null) { message.batchSize = object.batchSize | 0 }
    if (object.batchIndex != null) { message.batchIndex = object.batchIndex | 0 }
    if (object.batchId != null) { message.batchId = object.batchId | 0 }
    return message
  }

  /**
   * Creates a plain object from a MigrationPayload message. Also converts values to other types if specified.
   * @function toObject
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {googleauth.MigrationPayload} message MigrationPayload
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  MigrationPayload.toObject = function toObject(message, options) {
    if (!options) { options = {} }
    var object = {}
    if (options.arrays || options.defaults) { object.otpParameters = [] }
    if (options.defaults) {
      object.version = 0
      object.batchSize = 0
      object.batchIndex = 0
      object.batchId = 0
    }
    if (message.otpParameters && message.otpParameters.length) {
      object.otpParameters = []
      for (var j = 0; j < message.otpParameters.length; ++j) { object.otpParameters[j] = googleauth.MigrationPayload.OtpParameters.toObject(message.otpParameters[j], options) }
    }
    if (message.version != null && message.hasOwnProperty('version')) { object.version = message.version }
    if (message.batchSize != null && message.hasOwnProperty('batchSize')) { object.batchSize = message.batchSize }
    if (message.batchIndex != null && message.hasOwnProperty('batchIndex')) { object.batchIndex = message.batchIndex }
    if (message.batchId != null && message.hasOwnProperty('batchId')) { object.batchId = message.batchId }
    return object
  }

  /**
   * Converts this MigrationPayload to JSON.
   * @function toJSON
   * @memberof googleauth.MigrationPayload
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  MigrationPayload.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
  }

  /**
   * Gets the default type url for MigrationPayload
   * @function getTypeUrl
   * @memberof googleauth.MigrationPayload
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  MigrationPayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = 'type.googleapis.com'
    }
    return `${typeUrlPrefix}/googleauth.MigrationPayload`
  }

  /**
   * Algorithm enum.
   * @name googleauth.MigrationPayload.Algorithm
   * @enum {number}
   * @property {number} ALGO_INVALID=0 ALGO_INVALID value
   * @property {number} ALGO_SHA1=1 ALGO_SHA1 value
   */
  MigrationPayload.Algorithm = (function () {
    var valuesById = {}; var values = Object.create(valuesById)
    values[valuesById[0] = 'ALGO_INVALID'] = 0
    values[valuesById[1] = 'ALGO_SHA1'] = 1
    return values
  })()

  /**
   * OtpType enum.
   * @name googleauth.MigrationPayload.OtpType
   * @enum {number}
   * @property {number} OTP_INVALID=0 OTP_INVALID value
   * @property {number} OTP_HOTP=1 OTP_HOTP value
   * @property {number} OTP_TOTP=2 OTP_TOTP value
   */
  MigrationPayload.OtpType = (function () {
    var valuesById = {}; var values = Object.create(valuesById)
    values[valuesById[0] = 'OTP_INVALID'] = 0
    values[valuesById[1] = 'OTP_HOTP'] = 1
    values[valuesById[2] = 'OTP_TOTP'] = 2
    return values
  })()

  MigrationPayload.OtpParameters = (function () {
    /**
     * Properties of an OtpParameters.
     * @memberof googleauth.MigrationPayload
     * @interface IOtpParameters
     * @property {Uint8Array|null} [secret] OtpParameters secret
     * @property {string|null} [name] OtpParameters name
     * @property {string|null} [issuer] OtpParameters issuer
     * @property {googleauth.MigrationPayload.Algorithm|null} [algorithm] OtpParameters algorithm
     * @property {number|null} [digits] OtpParameters digits
     * @property {googleauth.MigrationPayload.OtpType|null} [type] OtpParameters type
     * @property {number|Long|null} [counter] OtpParameters counter
     */

    /**
     * Constructs a new OtpParameters.
     * @memberof googleauth.MigrationPayload
     * @classdesc Represents an OtpParameters.
     * @implements IOtpParameters
     * @constructor
     * @param {googleauth.MigrationPayload.IOtpParameters=} [properties] Properties to set
     */
    function OtpParameters(properties) {
      if (properties) {
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
          if (properties[keys[i]] != null) { this[keys[i]] = properties[keys[i]] }
        }
      }
    }

    /**
     * OtpParameters secret.
     * @member {Uint8Array} secret
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.secret = $util.newBuffer([])

    /**
     * OtpParameters name.
     * @member {string} name
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.name = ''

    /**
     * OtpParameters issuer.
     * @member {string} issuer
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.issuer = ''

    /**
     * OtpParameters algorithm.
     * @member {googleauth.MigrationPayload.Algorithm} algorithm
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.algorithm = 0

    /**
     * OtpParameters digits.
     * @member {number} digits
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.digits = 0

    /**
     * OtpParameters type.
     * @member {googleauth.MigrationPayload.OtpType} type
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.type = 0

    /**
     * OtpParameters counter.
     * @member {number|Long} counter
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     */
    OtpParameters.prototype.counter = $util.Long ? $util.Long.fromBits(0, 0, false) : 0

    /**
     * Creates a new OtpParameters instance using the specified properties.
     * @function create
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {googleauth.MigrationPayload.IOtpParameters=} [properties] Properties to set
     * @returns {googleauth.MigrationPayload.OtpParameters} OtpParameters instance
     */
    OtpParameters.create = function create(properties) {
      return new OtpParameters(properties)
    }

    /**
     * Encodes the specified OtpParameters message. Does not implicitly {@link googleauth.MigrationPayload.OtpParameters.verify|verify} messages.
     * @function encode
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {googleauth.MigrationPayload.IOtpParameters} message OtpParameters message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OtpParameters.encode = function encode(message, writer) {
      if (!writer) { writer = $Writer.create() }
      if (message.secret != null && Object.hasOwnProperty.call(message, 'secret')) { writer.uint32(/* id 1, wireType 2 = */10).bytes(message.secret) }
      if (message.name != null && Object.hasOwnProperty.call(message, 'name')) { writer.uint32(/* id 2, wireType 2 = */18).string(message.name) }
      if (message.issuer != null && Object.hasOwnProperty.call(message, 'issuer')) { writer.uint32(/* id 3, wireType 2 = */26).string(message.issuer) }
      if (message.algorithm != null && Object.hasOwnProperty.call(message, 'algorithm')) { writer.uint32(/* id 4, wireType 0 = */32).int32(message.algorithm) }
      if (message.digits != null && Object.hasOwnProperty.call(message, 'digits')) { writer.uint32(/* id 5, wireType 0 = */40).int32(message.digits) }
      if (message.type != null && Object.hasOwnProperty.call(message, 'type')) { writer.uint32(/* id 6, wireType 0 = */48).int32(message.type) }
      if (message.counter != null && Object.hasOwnProperty.call(message, 'counter')) { writer.uint32(/* id 7, wireType 0 = */56).int64(message.counter) }
      return writer
    }

    /**
     * Encodes the specified OtpParameters message, length delimited. Does not implicitly {@link googleauth.MigrationPayload.OtpParameters.verify|verify} messages.
     * @function encodeDelimited
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {googleauth.MigrationPayload.IOtpParameters} message OtpParameters message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OtpParameters.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes an OtpParameters message from the specified reader or buffer.
     * @function decode
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {googleauth.MigrationPayload.OtpParameters} OtpParameters
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OtpParameters.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) { reader = $Reader.create(reader) }
      var end = length === undefined ? reader.len : reader.pos + length; var message = new googleauth.MigrationPayload.OtpParameters()
      while (reader.pos < end) {
        var tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.secret = reader.bytes()
            break
          }
          case 2: {
            message.name = reader.string()
            break
          }
          case 3: {
            message.issuer = reader.string()
            break
          }
          case 4: {
            message.algorithm = reader.int32()
            break
          }
          case 5: {
            message.digits = reader.int32()
            break
          }
          case 6: {
            message.type = reader.int32()
            break
          }
          case 7: {
            message.counter = reader.int64()
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes an OtpParameters message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {googleauth.MigrationPayload.OtpParameters} OtpParameters
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OtpParameters.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) { reader = new $Reader(reader) }
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies an OtpParameters message.
     * @function verify
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OtpParameters.verify = function verify(message) {
      if (typeof message !== 'object' || message === null) { return 'object expected' }
      if (message.secret != null && message.hasOwnProperty('secret')) {
        if (!(message.secret && typeof message.secret.length === 'number' || $util.isString(message.secret))) { return 'secret: buffer expected' }
      }
      if (message.name != null && message.hasOwnProperty('name')) {
        if (!$util.isString(message.name)) { return 'name: string expected' }
      }
      if (message.issuer != null && message.hasOwnProperty('issuer')) {
        if (!$util.isString(message.issuer)) { return 'issuer: string expected' }
      }
      if (message.algorithm != null && message.hasOwnProperty('algorithm')) {
        switch (message.algorithm) {
          default:
            return 'algorithm: enum value expected'
          case 0:
          case 1:
            break
        }
      }
      if (message.digits != null && message.hasOwnProperty('digits')) {
        if (!$util.isInteger(message.digits)) { return 'digits: integer expected' }
      }
      if (message.type != null && message.hasOwnProperty('type')) {
        switch (message.type) {
          default:
            return 'type: enum value expected'
          case 0:
          case 1:
          case 2:
            break
        }
      }
      if (message.counter != null && message.hasOwnProperty('counter')) {
        if (!$util.isInteger(message.counter) && !(message.counter && $util.isInteger(message.counter.low) && $util.isInteger(message.counter.high))) { return 'counter: integer|Long expected' }
      }
      return null
    }

    /**
     * Creates an OtpParameters message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {googleauth.MigrationPayload.OtpParameters} OtpParameters
     */
    OtpParameters.fromObject = function fromObject(object) {
      if (object instanceof googleauth.MigrationPayload.OtpParameters) { return object }
      var message = new googleauth.MigrationPayload.OtpParameters()
      if (object.secret != null) {
        if (typeof object.secret === 'string') { $util.base64.decode(object.secret, message.secret = $util.newBuffer($util.base64.length(object.secret)), 0) }
        else if (object.secret.length >= 0) { message.secret = object.secret }
      }
      if (object.name != null) { message.name = String(object.name) }
      if (object.issuer != null) { message.issuer = String(object.issuer) }
      switch (object.algorithm) {
        default:
          if (typeof object.algorithm === 'number') {
            message.algorithm = object.algorithm
            break
          }
          break
        case 'ALGO_INVALID':
        case 0:
          message.algorithm = 0
          break
        case 'ALGO_SHA1':
        case 1:
          message.algorithm = 1
          break
      }
      if (object.digits != null) { message.digits = object.digits | 0 }
      switch (object.type) {
        default:
          if (typeof object.type === 'number') {
            message.type = object.type
            break
          }
          break
        case 'OTP_INVALID':
        case 0:
          message.type = 0
          break
        case 'OTP_HOTP':
        case 1:
          message.type = 1
          break
        case 'OTP_TOTP':
        case 2:
          message.type = 2
          break
      }
      if (object.counter != null) {
        if ($util.Long) { (message.counter = $util.Long.fromValue(object.counter)).unsigned = false }
        else if (typeof object.counter === 'string') { message.counter = Number.parseInt(object.counter, 10) }
        else if (typeof object.counter === 'number') { message.counter = object.counter }
        else if (typeof object.counter === 'object') { message.counter = new $util.LongBits(object.counter.low >>> 0, object.counter.high >>> 0).toNumber() }
      }
      return message
    }

    /**
     * Creates a plain object from an OtpParameters message. Also converts values to other types if specified.
     * @function toObject
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {googleauth.MigrationPayload.OtpParameters} message OtpParameters
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OtpParameters.toObject = function toObject(message, options) {
      if (!options) { options = {} }
      var object = {}
      if (options.defaults) {
        if (options.bytes === String) {
          object.secret = ''
        }
        else {
          object.secret = []
          if (options.bytes !== Array) { object.secret = $util.newBuffer(object.secret) }
        }
        object.name = ''
        object.issuer = ''
        object.algorithm = options.enums === String ? 'ALGO_INVALID' : 0
        object.digits = 0
        object.type = options.enums === String ? 'OTP_INVALID' : 0
        if ($util.Long) {
          var long = new $util.Long(0, 0, false)
          object.counter = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long
        }
        else {
          object.counter = options.longs === String ? '0' : 0
        }
      }
      if (message.secret != null && message.hasOwnProperty('secret')) { object.secret = options.bytes === String ? $util.base64.encode(message.secret, 0, message.secret.length) : options.bytes === Array ? Array.prototype.slice.call(message.secret) : message.secret }
      if (message.name != null && message.hasOwnProperty('name')) { object.name = message.name }
      if (message.issuer != null && message.hasOwnProperty('issuer')) { object.issuer = message.issuer }
      if (message.algorithm != null && message.hasOwnProperty('algorithm')) { object.algorithm = options.enums === String ? googleauth.MigrationPayload.Algorithm[message.algorithm] === undefined ? message.algorithm : googleauth.MigrationPayload.Algorithm[message.algorithm] : message.algorithm }
      if (message.digits != null && message.hasOwnProperty('digits')) { object.digits = message.digits }
      if (message.type != null && message.hasOwnProperty('type')) { object.type = options.enums === String ? googleauth.MigrationPayload.OtpType[message.type] === undefined ? message.type : googleauth.MigrationPayload.OtpType[message.type] : message.type }
      if (message.counter != null && message.hasOwnProperty('counter')) {
        if (typeof message.counter === 'number') { object.counter = options.longs === String ? String(message.counter) : message.counter }
        else { object.counter = options.longs === String ? $util.Long.prototype.toString.call(message.counter) : options.longs === Number ? new $util.LongBits(message.counter.low >>> 0, message.counter.high >>> 0).toNumber() : message.counter }
      }
      return object
    }

    /**
     * Converts this OtpParameters to JSON.
     * @function toJSON
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OtpParameters.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for OtpParameters
     * @function getTypeUrl
     * @memberof googleauth.MigrationPayload.OtpParameters
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OtpParameters.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = 'type.googleapis.com'
      }
      return `${typeUrlPrefix}/googleauth.MigrationPayload.OtpParameters`
    }

    return OtpParameters
  })()

  return MigrationPayload
})()

export { googleauth }
