/**
 * @param {object} data
 * @param {string} dateParam name of Date parameter to be sorted based on. Must be parseable by Date.parse() e.g. "2021-11-12T20:14:39.878Z"
 * @param {boolean} isLatestFirst default true - sorts so that latest values come first
 * @returns
 */
export default function sortDataByTimestamp(
  data,
  dateParam,
  isLatestFirst = true
) {
  if (!data[0][dateParam]) return

  // Converting string time to number value
  // "2021-11-12T20:14:39.878Z" ==> 1634069679878
  data.map((item) => (item[dateParam] = Date.parse(item[dateParam])))

  // Sort
  isLatestFirst
    ? data.sort((x, y) => y[dateParam] - x[dateParam])
    : data.sort((x, y) => x[dateParam] - y[dateParam])

  return data
}
