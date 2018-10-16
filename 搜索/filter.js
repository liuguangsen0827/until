// 兼容ie9 以下的reduce()
function fakeReduce(fn, base, inArr) {
  const initialArr = inArr
  const arr = initialArr.concat()
  if (base) arr.unshift(base)
  let index, newValue

  while (arr.length > 1) {
    index = initialArr.length - arr.length + 1
    newValue = fn.call('', arr[0], arr[1], index, initialArr)

    arr.splice(0, 2, newValue) // 直接用 splice 实现替换
  }

  return newValue
}
// 兼容ie9 以下的trim()
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm, '')
}
export default function filter(data, filterItems) {
  for (const k in filterItems) {
    if (filterItems[k] === '') {
      delete filterItems[k]
    }
  }
  return data.filter(order => {
    return fakeReduce((flag, item) => {
      if (!flag) {
        return false
      } else {
        if (item === 'IS_RELEASE') {
          if (filterItems[item] === order[item]) {
            return true
          }
        } else if (item === 'DICT_USER_TYPE') {
          if (filterItems[item] === order[item]) {
            return true
          }
        } else {
          return myTrim(filterItems[item]) ? String(order[item]).indexOf(filterItems[item]) !== -1 : true
        }
      }
    }, true, Object.keys(filterItems))
  })
}
