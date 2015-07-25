// JS日历转化公用类
// @date   2010-06-01
 function tagLunarCal( d, i, w, k, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13) {
    this.BaseDays = d;         /* 1 月 1 日到正月初一的累计日 */
    this.Intercalation = i;    /* 闰月月份. 0==此年沒有闰月 */
    this.BaseWeekday = w;      /* 此年 1 月 1 日为星期减 1 */
    this.BaseKanChih = k;      /* 此年 1 月 1 日之干支序号减 1 */
    this.MonthDays = [ m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13 ]; /* 此农历年每月之大小, 0==小月(29日), 1==大月(30日) */
}

// 闰年判断.返回1 或 0
function GetLeap(year) {
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 1 : 0;
}

// 主类入口
// @param {Date} new Date(y,m,d)
// @param {Boolean} 0: 农历-->公历 1: 公历 --> 农历
// @return {String} 见example
// @example
// CalConvert(new Date(2010,3,19), false) 即农历的四月十九转为公历  结果为 2010-06-01
// CalConvert(new Date(2010,5,1), true)   即公历的6月1日转为农历    结果为 2010年四月十九
//
function CalConvert(date, sign) {
    // 日期上下限
    FIRSTYEAR = 1936;
    LASTYEAR = 2031;
    // 返回结果值
    RESULT = 0;
    // 对照表
    LunarCal = [
        new tagLunarCal(23, 3, 2, 17, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0 ), /* 1936 */
        new tagLunarCal( 41, 0, 4, 23, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1 ),
        new tagLunarCal( 30, 7, 5, 28, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 49, 0, 6, 33, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
        new tagLunarCal( 38, 0, 0, 38, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ), /* 1940 */
        new tagLunarCal( 26, 6, 2, 44, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 45, 0, 3, 49, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 35, 0, 4, 54, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 24, 4, 5, 59, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1 ), /* 1944 */
        new tagLunarCal( 43, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 ),
        new tagLunarCal( 32, 0, 1, 10, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1 ),
        new tagLunarCal( 21, 2, 2, 15, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
        new tagLunarCal( 40, 0, 3, 20, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ), /* 1948 */
        new tagLunarCal( 28, 7, 5, 26, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 47, 0, 6, 31, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 36, 0, 0, 36, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 26, 5, 1, 41, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ), /* 1952 */
        new tagLunarCal( 44, 0, 3, 47, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 33, 0, 4, 52, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0 ),
        new tagLunarCal( 23, 3, 5, 57, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ),
        new tagLunarCal( 42, 0, 6, 2, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ), /* 1956 */
        new tagLunarCal( 30, 8, 1, 8, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 48, 0, 2, 13, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 38, 0, 3, 18, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 27, 6, 4, 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ), /* 1960 */
        new tagLunarCal( 45, 0, 6, 29, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 35, 0, 0, 34, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 24, 4, 1, 39, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0 ),
        new tagLunarCal( 43, 0, 2, 44, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0 ), /* 1964 */
        new tagLunarCal( 32, 0, 4, 50, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 20, 3, 5, 55, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0 ),
        new tagLunarCal( 39, 0, 6, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 29, 7, 0, 5, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1 ), /* 1968 */
        new tagLunarCal( 47, 0, 2, 11, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 36, 0, 3, 16, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0 ),
        new tagLunarCal( 26, 5, 4, 21, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1 ),
        new tagLunarCal( 45, 0, 5, 26, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1 ), /* 1972 */
        new tagLunarCal( 33, 0, 0, 32, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1 ),
        new tagLunarCal( 22, 4, 1, 37, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 41, 0, 2, 42, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1 ),
        new tagLunarCal( 30, 8, 3, 47, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1 ), /* 1976 */
        new tagLunarCal( 48, 0, 5, 53, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1 ),
        new tagLunarCal( 37, 0, 6, 58, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 27, 6, 0, 3, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0 ),
        new tagLunarCal( 46, 0, 1, 8, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0 ), /* 1980 */
        new tagLunarCal( 35, 0, 3, 14, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1 ),
        new tagLunarCal( 24, 4, 4, 19, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 ),
        new tagLunarCal( 43, 0, 5, 24, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 ),
        new tagLunarCal( 32, 10, 6, 29, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1 ), /* 1984 */
        new tagLunarCal( 50, 0, 1, 35, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 39, 0, 2, 40, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1 ),
        new tagLunarCal( 28, 6, 3, 45, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0 ),
        new tagLunarCal( 47, 0, 4, 50, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ), /* 1988 */
        new tagLunarCal( 36, 0, 6, 56, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0 ),
        new tagLunarCal( 26, 5, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1 ),
        new tagLunarCal( 45, 0, 1, 6, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0 ),
        new tagLunarCal( 34, 0, 2, 11, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0 ), /* 1992 */
        new tagLunarCal( 22, 3, 4, 17, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 40, 0, 5, 22, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 30, 8, 6, 27, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1 ),
        new tagLunarCal( 49, 0, 0, 32, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1 ), /* 1996 */
        new tagLunarCal( 37, 0, 2, 38, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 27, 5, 3, 43, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 46,  0, 4, 48, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1 ), /* 1999 */
        new tagLunarCal( 35,  0, 5, 53, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1 ), /* 2000 */
        new tagLunarCal( 23,  4, 0, 59, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 42,  0, 1,  4, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 31,  0, 2,  9, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 21,  2, 3, 14, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1 ), /* 2004 */
        new tagLunarCal( 39,  0, 5, 20, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 28,  7, 6, 25, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1 ),
        new tagLunarCal( 48,  0, 0, 30, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 ),
        new tagLunarCal( 37,  0, 1, 35, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1 ), /* 2008 */
        new tagLunarCal( 25,  5, 3, 41, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
        new tagLunarCal( 44,  0, 4, 46, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ),
        new tagLunarCal( 33,  0, 5, 51, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 22,  4, 6, 56, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ), /* 2012 */
        new tagLunarCal( 40,  0, 1,  2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 30,  9, 2,  7, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 49,  0, 3, 12, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 38,  0, 4, 17, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0 ), /* 2016 */
        new tagLunarCal( 27,  6, 6, 23, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ),
        new tagLunarCal( 46,  0, 0, 28, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0 ),
        new tagLunarCal( 35,  0, 1, 33, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0 ),
        new tagLunarCal( 24,  4, 2, 38, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1 ), /* 2020 */
        new tagLunarCal( 42,  0, 4, 44, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 31,  0, 5, 49, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0 ),
        new tagLunarCal( 21,  2, 6, 54, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1 ),
        new tagLunarCal( 40,  0, 0, 59, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1 ), /* 2024 */
        new tagLunarCal( 28,  6, 2,  5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0 ),
        new tagLunarCal( 47,  0, 3, 10, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1 ),
        new tagLunarCal( 36,  0, 4, 15, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1 ),
        new tagLunarCal( 25,  5, 5, 20, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0 ), /* 2028 */
        new tagLunarCal( 43,  0, 0, 26, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1 ),
        new tagLunarCal( 32,  0, 1, 31, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0 ),
        new tagLunarCal( 22,  3, 2, 36, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0 ) ];

        /* 西曆年每月之日數 */
        SolarCal = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        /* 西曆年每月之累積日數, 平年與閏年 */
        SolarDays = [
            0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365, 396,
            0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366, 397 ];

        AnimalIdx = ["馬 ", "羊 ", "猴 ", "雞 ", "狗 ", "豬 ", "鼠 ", "牛 ", "虎 ", "兔 ", "龍 ", "蛇 " ];
        LocationIdx = [ "南", "東", "北", "西" ];

        var func = sign ? function(d) {
                function getBit(m, n) { return (m >> n) & 1; }
                var mons = "正二三四五六七八九十冬腊", Cal = [0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B,0x60A57,0x52B,0xA93,0x40E95];
                var total, m, n, k, isEnd = false, t = d.getYear();
                if (t < 1900) t += 1900;
                total = (t - 2001) * 365 + Math.floor((t - 2001) / 4) + [0,31,59,90,120,151,181,212,243,273,304,334][d.getMonth()] + d.getDate() - 23;
                if(d.getYear() % 4 == 0 && d.getMonth() > 1) total++;
                for(m = 0; m < 1000; m++){
                    k = (Cal[m] < 0xfff) ? 11 : 12;
                    for(n = k; n >= 0; n--) {
                        if(total <= 29 + getBit(Cal[m],n)){
                            isEnd=true;
                            break;
                        }
                        total = total - 29 - getBit(Cal[m],n);
                    }
                    if(isEnd) break;
                }
                var cYear = 2001 + m, cMonth = k - n + 1;
                if(k == 12){
                    if(cMonth == Math.floor(Cal[m] / 0x10000) + 1)
                        cMonth = 1 - cMonth;
                    if(cMonth > Math.floor(Cal[m] / 0x10000) + 1)
                        cMonth--;
                }
                var t = "";
                if(cMonth < 1){
                    t += "闰";
                    t += mons.charAt(-cMonth -1);
                }
                else t += mons.charAt(cMonth - 1);
                t += "月";
                t += (total < 11) ? "初" : ((total < 20) ? "十" :( (total<30) ? "廿" : "卅"));
                if(total % 10 != 0 || total == 10) t += "一二三四五六七八九十".charAt((total-1) % 10);
                return t;
        } : function(d) {
                var LunarYear = d.getFullYear(),
                    LunarMonth = d.getMonth() + 1,
                    LunarDate = d.getDate(),
                    acc = 0,
                    leap, SolarDate, y, im, lm;
                if (LunarYear < FIRSTYEAR || LunarYear >= LASTYEAR) {
                    alert('只处理1936 - 2031有效年份');
                    return false;
                }
                y = LunarYear - FIRSTYEAR;
                im = LunarCal[y].Intercalation;
                lm = LunarMonth;
                if (lm < 0) {
                    if (lm != -im) {
                        alert('月份无效');
                        return false;
                    }
                }
                else if (lm < 1 || lm > 12) {
                    alert('月份无效');
                    return false;
                }
                if (im != 0) {
                    if (lm > im) {
                        lm++;
                    } else if (lm == -im) {
                        lm = im + 1;
                    }
                }
                lm--;

                if (LunarDate > LunarCal[y].MonthDays[lm] + 29) {
                    alert('农历日期不正确');
                    return false;
                }

                for (i = 0; i < lm; i++) {
                    acc += LunarCal[y].MonthDays[i] + 29;
                }
                acc += LunarCal[y].BaseDays + LunarDate;

                leap = GetLeap(LunarYear);
                for (i = 13; i >= 0; i--) {
                    if (acc > SolarDays[leap * 14 + i])
                        break;
                }
                SolarDate = acc - SolarDays[leap * 14 + i];

                if (i <= 11) {
                    SolarYear = LunarYear;
                    SolarMonth = i + 1;
                } else {
                    SolarYear = LunarYear + 1;
                    SolarMonth = i - 11;
                }

                leap = GetLeap(SolarYear);
                y = SolarYear - FIRSTYEAR;

                acc = SolarDays[leap * 14 + SolarMonth - 1] + SolarDate;

                weekday = (acc + LunarCal[y].BaseWeekDay) % 7;
                kc = acc + LunarCal[y].BaseKanChih;
                kan = kc % 10;
                chih = kc % 12;
                return SolarYear + '-' + SolarMonth + '-' + SolarDate;
        }

    return func(date);
}

/**
 * 计算农历
 * @param {Date} 日期
 * @return {string} [2009,腊月,十二,(是否闰月true/false),己丑,戊寅,丙子,立秋(没有则为空)]
 */
function CalCND(iy,im,id){
	var CalendarData = new Array(100);
	var madd = new Array(12);
	var tgString = "甲乙丙丁戊己庚辛壬癸";
	var dzString = "子丑寅卯辰巳午未申酉戌亥";
	var numString = "一二三四五六七八九十";
	var monString = "正二三四五六七八九十冬腊";
	var weekString = "日一二三四五六";
	var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
	var cYear, cMonth, cDay, TheDate;
	CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
	madd[0] = 0;
	madd[1] = 31;
	madd[2] = 59;
	madd[3] = 90;
	madd[4] = 120;
	madd[5] = 151;
	madd[6] = 181;
	madd[7] = 212;
	madd[8] = 243;
	madd[9] = 273;
	madd[10] = 304;
	madd[11] = 334;

	function GetBit(m, n) {
		return (m >> n) & 1;
	}
	function e2c() {
		TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
		var total, m, n, k;
		var isEnd = false;
		var tmp = TheDate.getYear();
		if (tmp < 1900) {
			tmp += 1900;
		}
		total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

		if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
			total++;
		}
		for (m = 0; ; m++) {
			k = (CalendarData[m] < 0xfff) ? 11 : 12;
			for (n = k; n >= 0; n--) {
				if (total <= 29 + GetBit(CalendarData[m], n)) {
					isEnd = true; break;
				}
				total = total - 29 - GetBit(CalendarData[m], n);
			}
			if (isEnd) break;
		}
		cYear = 1921 + m;
		cMonth = k - n + 1;
		cDay = total;
		if (k == 12) {
			if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
				cMonth = 1 - cMonth;
			}
			if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
				cMonth--;
			}
		}
	}

	function GetcDateString() {
		var tmp = "";
		if (cMonth < 1) {
			tmp += "(闰)";
			tmp += monString.charAt(-cMonth - 1);
		} else {
			tmp += monString.charAt(cMonth - 1);
		}
		tmp += "月";
		tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
		if (cDay % 10 != 0 || cDay == 10) {
			tmp += numString.charAt((cDay - 1) % 10);
		}
		tmp += " ";
		tmp += tgString.charAt((cYear - 4) % 10);
		tmp += dzString.charAt((cYear - 4) % 12);
		tmp += "(";
		tmp += sx.charAt((cYear - 4) % 12);
		tmp += ")年 ";
		return tmp;
	}

	function GetLunarDay(solarYear, solarMonth, solarDay) {
		//solarYear = solarYear<1900?(1900+solarYear):solarYear;
		if (solarYear < 1921 || solarYear > 2020) {
			return "";
		} else {
			solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
			e2c(solarYear, solarMonth, solarDay);
			return GetcDateString();
		}
	}
	im = im-1;
	var D = new Date(iy,im,id);
	var yy = D.getFullYear();
	var mm = D.getMonth() + 1;
	var dd = D.getDate();
	var ww = D.getDay();
	var ss = parseInt(D.getTime() / 1000);
	if (yy < 100) yy = "19" + yy;
	return GetLunarDay(yy, mm, dd);
}