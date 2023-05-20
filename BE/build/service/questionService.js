"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var postQuestionByAdminService = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(quiz_id, description, image) {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _index["default"].QuizQuestions.create({
            quiz_id: quiz_id,
            description: description,
            image: image
          });
        case 3:
          data = _context.sent;
          return _context.abrupt("return", {
            EM: 'Create question success !',
            EC: 0,
            DT: data
          });
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(">>> check error: ", _context.t0);
          return _context.abrupt("return", {
            EM: 'Error from postQuestionByAdminService',
            EC: 1,
            DT: []
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function postQuestionByAdminService(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var postQuizUpsertQAService = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(quizId, questions) {
    var res, feLength, i, feQuizAnswers, beLength, _i, beQuizAnswers, _iterator, _step, question, qAnswerFe, qAnswerBe, uniqueAnswers, _i2, _uniqueAnswers, _question, answerIdFe, answerIdBe, allIdsFe, allIdsBe, uniqueIds, QaFe, QaBe, uniqueData, _i3, _uniqueData, questionFe, createdQuestion, _iterator2, _step2, answer, _feLength, _i4, _feQuizAnswers, _beLength, _i5, _beQuizAnswers, questionIdFe, questionIdBe, _allIdsFe, _allIdsBe, _uniqueIds, _feLength2, _i6, _feQuizAnswers2, _beLength2, _i7, _beQuizAnswers2;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _index["default"].QuizQuestions.findAll({
            attributes: ["id", "quiz_id", "description"],
            where: {
              quiz_id: quizId
            },
            include: [{
              model: _index["default"].QuizAnswers,
              attributes: ["id", "question_id", "description", "correct_answer"]
            }]
          });
        case 2:
          res = _context6.sent;
          if (!(questions.length === res.length)) {
            _context6.next = 53;
            break;
          }
          console.log('cập nhật câu hỏi');
          feLength = 0;
          for (i = 0; i < questions.length; i++) {
            feQuizAnswers = questions[i].QuizAnswers;
            feLength += feQuizAnswers.length;
          }
          beLength = 0;
          for (_i = 0; _i < res.length; _i++) {
            beQuizAnswers = res[_i].QuizAnswers;
            beLength += beQuizAnswers.length;
          }
          if (!(feLength === beLength)) {
            _context6.next = 30;
            break;
          }
          console.log('cập nhật câu hỏi và trả lời .');
          _iterator = _createForOfIteratorHelper(questions);
          _context6.prev = 12;
          _iterator.s();
        case 14:
          if ((_step = _iterator.n()).done) {
            _context6.next = 22;
            break;
          }
          question = _step.value;
          _context6.next = 18;
          return _index["default"].QuizQuestions.update({
            description: question.description,
            image: question.image
          }, {
            where: {
              id: question.id
            }
          });
        case 18:
          _context6.next = 20;
          return Promise.all(question.QuizAnswers.map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(answer) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", _index["default"].QuizAnswers.update({
                      description: answer.description,
                      correct_answer: answer.correct_answer
                    }, {
                      where: {
                        id: answer.id
                      }
                    }));
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x6) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 20:
          _context6.next = 14;
          break;
        case 22:
          _context6.next = 27;
          break;
        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](12);
          _iterator.e(_context6.t0);
        case 27:
          _context6.prev = 27;
          _iterator.f();
          return _context6.finish(27);
        case 30:
          if (!(feLength > beLength)) {
            _context6.next = 44;
            break;
          }
          console.log('thêm câu trả lời mới.');
          qAnswerFe = questions.map(function (question) {
            return question.QuizAnswers.map(function (answer) {
              return {
                answerId: answer.id,
                description: answer.description,
                correct_answer: answer.correct_answer,
                question_id: question.id
              };
            });
          });
          qAnswerBe = res.map(function (item) {
            return item.QuizAnswers.map(function (item) {
              return {
                answerId: item.id,
                description: item.description,
                correct_answer: item.correct_answer,
                question_id: item.question_id
              };
            });
          });
          uniqueAnswers = [];
          qAnswerFe.forEach(function (questionFe, index) {
            var questionBe = qAnswerBe[index];
            var uniqueAnswersQuestion = [];
            questionFe.forEach(function (answerFe) {
              var answerBe = questionBe.find(function (answer) {
                return answer.answerId === answerFe.answerId;
              });
              if (!answerBe) {
                uniqueAnswersQuestion.push(answerFe);
              }
            });
            uniqueAnswers.push(uniqueAnswersQuestion);
          });
          _i2 = 0, _uniqueAnswers = uniqueAnswers;
        case 37:
          if (!(_i2 < _uniqueAnswers.length)) {
            _context6.next = 44;
            break;
          }
          _question = _uniqueAnswers[_i2];
          _context6.next = 41;
          return Promise.all(_question.map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(answer) {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", _index["default"].QuizAnswers.create({
                      description: answer.description,
                      correct_answer: answer.correct_answer,
                      question_id: answer.question_id
                    }));
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x7) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 41:
          _i2++;
          _context6.next = 37;
          break;
        case 44:
          if (!(feLength < beLength)) {
            _context6.next = 53;
            break;
          }
          console.log('xóa câu trả lời.');
          answerIdFe = questions.map(function (item) {
            return item.QuizAnswers.map(function (item) {
              return item.id;
            });
          }); //console.log('data fe', answerIdFe);
          answerIdBe = res.map(function (item) {
            return item.QuizAnswers.map(function (item) {
              return item.id;
            });
          }); //console.log('data be', answerIdBe);
          allIdsFe = answerIdFe.flat();
          allIdsBe = answerIdBe.flat(); // tìm các id không trùng nhau trong hai mảng allIdsFe và allIdsBe
          uniqueIds = allIdsBe.filter(function (id) {
            return !allIdsFe.includes(id);
          }); //console.log(uniqueIds); 
          _context6.next = 53;
          return Promise.all(uniqueIds.map( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", _index["default"].QuizAnswers.destroy({
                      where: {
                        id: id
                      }
                    }));
                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x8) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 53:
          if (!(questions.length > res.length)) {
            _context6.next = 92;
            break;
          }
          console.log('thêm câu hỏi');
          QaFe = questions.map(function (question) {
            return {
              id: question.id,
              description: question.description,
              imgFile: question.image,
              QuizAnswers: question.QuizAnswers.map(function (answer) {
                return {
                  id: answer.id,
                  description: answer.description,
                  correct_answer: answer.correct_answer,
                  question_id: answer.question_id
                };
              })
            };
          });
          QaBe = res.map(function (question) {
            return {
              id: question.id,
              description: question.description,
              imgFile: question.image,
              QuizAnswers: question.QuizAnswers.map(function (answer) {
                return {
                  id: answer.id,
                  description: answer.description,
                  correct_answer: answer.correct_answer,
                  question_id: answer.question_id
                };
              })
            };
          }); // Tạo một mảng rỗng để lưu trữ các đối tượng không trùng lặp
          uniqueData = []; // Duyệt qua từng đối tượng trong mảng QaFe
          QaFe.forEach(function (questionFe) {
            // Tìm đối tượng tương ứng trong mảng QaBe
            var questionBe = QaBe.find(function (question) {
              return question.id === questionFe.id;
            });

            // Nếu không tìm thấy đối tượng trong QaBe, thì đối tượng trong QaFe là đối tượng không trùng lặp
            if (!questionBe) {
              uniqueData.push(questionFe);
            }
          });

          // In ra mảng mới
          _i3 = 0, _uniqueData = uniqueData;
        case 60:
          if (!(_i3 < _uniqueData.length)) {
            _context6.next = 85;
            break;
          }
          questionFe = _uniqueData[_i3];
          _context6.next = 64;
          return _index["default"].QuizQuestions.create({
            description: questionFe.description,
            image: questionFe.imgFile,
            quiz_id: quizId
          });
        case 64:
          createdQuestion = _context6.sent;
          _iterator2 = _createForOfIteratorHelper(questionFe.QuizAnswers);
          _context6.prev = 66;
          _iterator2.s();
        case 68:
          if ((_step2 = _iterator2.n()).done) {
            _context6.next = 74;
            break;
          }
          answer = _step2.value;
          _context6.next = 72;
          return _index["default"].QuizAnswers.create({
            description: answer.description,
            correct_answer: answer === null || answer === void 0 ? void 0 : answer.correct_answer,
            question_id: createdQuestion.id
          });
        case 72:
          _context6.next = 68;
          break;
        case 74:
          _context6.next = 79;
          break;
        case 76:
          _context6.prev = 76;
          _context6.t1 = _context6["catch"](66);
          _iterator2.e(_context6.t1);
        case 79:
          _context6.prev = 79;
          _iterator2.f();
          return _context6.finish(79);
        case 82:
          _i3++;
          _context6.next = 60;
          break;
        case 85:
          _feLength = 0;
          for (_i4 = 0; _i4 < questions.length; _i4++) {
            _feQuizAnswers = questions[_i4].QuizAnswers;
            _feLength += _feQuizAnswers.length;
          }
          _beLength = 0;
          for (_i5 = 0; _i5 < res.length; _i5++) {
            _beQuizAnswers = res[_i5].QuizAnswers;
            _beLength += _beQuizAnswers.length;
          }
          if (_feLength === _beLength) {
            console.log('cập nhật câu hỏi và trả lời .');
          }
          if (_feLength > _beLength) {
            console.log('thêm câu trả lời mới.');
          }
          if (_feLength < _beLength) {
            console.log('xóa câu trả lời.');
          }
        case 92:
          if (!(questions.length < res.length)) {
            _context6.next = 110;
            break;
          }
          console.log('xoa question');
          questionIdFe = questions.map(function (item) {
            return item.id;
          });
          questionIdBe = res.map(function (item) {
            return item.id;
          });
          _allIdsFe = questionIdFe.flat();
          _allIdsBe = questionIdBe.flat(); // tìm các id không trùng nhau trong hai mảng allIdsFe và allIdsBe
          _uniqueIds = _allIdsBe.filter(function (id) {
            return !_allIdsFe.includes(id);
          });
          _context6.next = 101;
          return _index["default"].sequelize.transaction( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(t) {
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _index["default"].QuizQuestions.destroy({
                      where: {
                        id: _uniqueIds
                      },
                      transaction: t
                    });
                  case 2:
                    _context5.next = 4;
                    return _index["default"].QuizAnswers.destroy({
                      where: {
                        question_id: _uniqueIds
                      },
                      transaction: t
                    });
                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x9) {
              return _ref6.apply(this, arguments);
            };
          }());
        case 101:
          _feLength2 = 0;
          for (_i6 = 0; _i6 < questions.length; _i6++) {
            _feQuizAnswers2 = questions[_i6].QuizAnswers;
            _feLength2 += _feQuizAnswers2.length;
          }
          console.log('feLength', _feLength2);
          _beLength2 = 0;
          for (_i7 = 0; _i7 < res.length; _i7++) {
            _beQuizAnswers2 = res[_i7].QuizAnswers;
            _beLength2 += _beQuizAnswers2.length;
          }
          console.log('beLength', _beLength2);
          if (_feLength2 === _beLength2) {
            console.log('cập nhật câu hỏi và trả lời .');
          }
          if (_feLength2 > _beLength2) {
            console.log('thêm câu trả lời mới.');
          }
          if (_feLength2 < _beLength2) {
            console.log('xóa câu trả lời.');
          }
        case 110:
          return _context6.abrupt("return", {
            EM: 'Update quiz question and answer success !',
            EC: 0,
            DT: []
          });
        case 111:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[12, 24, 27, 30], [66, 76, 79, 82]]);
  }));
  return function postQuizUpsertQAService(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  postQuestionByAdminService: postQuestionByAdminService,
  postQuizUpsertQAService: postQuizUpsertQAService
};