/*
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2025-01-13 10:13:24
 * @LastEditors: zhangxy
 * @LastEditTime: 2025-01-13 16:19:22
 */
export const prompt = {
  retire: {
    content: `
      提取图片中的信息并翻译成英文，并保存成json数据，我需要的信息如下:其中字段名在()内，要求在[]内
      1.社会保障号码(social_security_number)
      2.发证日期(date_of_registration)
      3.姓名(name)
      4.性别(gender)
      5.出生年月(date_of_birth)
      6.民族(ethnic_status)
      7.籍贯(native_Place)
      8.参加工作时间(date_of_joining_the_workforce)
      9.退休时间(retirement_time)
      10.退休时身份类别(status_category_at_retirement)
      11.退休时职务(岗位)(retirement_position)
    `,
  },
};
const template = {
  "social_security_number": "2323113264264.0010",
  "date_of_registration": "2019-09-30",
  "name": "Gan Huashan",
  "gender": "Male",
  "date_of_birth": "1983-07",
  "ethnic_status": "Han",
  "native_Place": "Bin County, Sichuan",
  "date_of_joining_the_workforce": "1977-07",
  "retirement_time": "2018-09",
  "status_category_at_retirement": "Professional and Technical Personnel",
  "retirement_position": "Secondary Artist in Horticulture"
}