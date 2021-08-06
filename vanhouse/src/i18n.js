import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "Language": "Language",
      "VANHOUSE": "VANHOUSE",
      "Home": "Home",
      "Login": "Login",
      "Hi": "Hi",
      "Account": "Account",
      "Logout": "Logout",
      "User List": "User List",

      "City": "City",
      "Price": "Price",
      "Keyword": "Keyword",
      "Cancel": "Cancel",
      
       "Vancouver":"Vancouver",
       "Burnaby":"Burnaby",
       "Richmond": "Richmond",

      "Post": "Post",
      "See more posts": "See more posts",
      
      "Enter email" :  "Enter email",

      "Email address": "Email address",
      "Password": "Password",
      "Close": "Close",
      "Forgot Password": "Forgot password",
      "Register for a new account": "Register for a new account",

      "forgot password hint": "If you are registered in our system, you will receive an email to reset your password.",
      "Submit": "Submit",
      "user not found hint": "User not found. Please register to continue.",
      "Please enter an email.": "Please enter an email.",
      "Please enter a valid email.": "Please enter an valid email.",

      "Register": "Register",
      "Enter first name*": "Enter first name*",
      "Enter last name*": "Enter last name*",
      "Confirm password": "Confirm password",
      "required fields": "required fields",
      "Please choose a password": "Please choose a password",
      "Register hint": "For full access to our features, including ability to posting your own properties, please register.",
      "Password at least": "Password must be at least {{0}} characters.",
      "Password max": "Password must be less than {{0}} characters.",
      "Password must contain at least 1 number.": "Password must contain at least 1 number.",
      "Password special": "Password must contain at least 1 special character.",
      "The passwords must match.": "The passwords must match.",

      "Create a new rental listing": "Create a new rental listing",
      "Title": "Title",
      "Phone number": "Phone number",
      "Address": "Address",
      "Postal Code": "Postal Code",
      "Payment period": "Payment period",
      "Lease length": "Lease length",
      "Bedrooms": "Bedrooms",
      "Bathrooms": "Bathrooms",
      "Square ft": "Square ft",
      "Utilities included": "Utilities included",
      "In suite laundry": "In suite laundry",
      "Pets allowed": "Pets allowed",
      "Furnished": "Furnished",
      "Continue": "Continue",
      "daily": "daily",
      "weekly": "weekly",
      "monthly": "monthly",
      "no lease": "no lease",
      "months": "months",
      "year": "year",

      "Select Images": "Select Images",
      "Upload 1-4 images": "Upload 1-4 images",
      "Select main image": "Select main image",
      "Crop main image": "Crop main image",
      "Scroll to zoom": "Scroll to zoom",
      "Select some available dates": "Select some available dates",
      "Let tenants know": "Let tenants know when you're available for a home tour!",
      "You can pick multiple dates!": "You can pick multiple dates!",
      "Waiting...": "Waiting...",
      "Image size limit": "Image file size exceeds 1MB. Please select files under 1MB.",

      "Book a home tour!": "Book a home tour!",
      "Email": "Email",
      "Pets friendly": "Pets friendly",
      "No pets": "No pets",
      "Utility included": "Utility included",
      "Utility not included": "Utility not included",
      "Ensuite laundry": "Ensuite laundry",
      "No ensuite laundry": "No ensuite laundry",
      "Unfurnished": "Unfurnished",
      "View More": "View More",
      "Comment": "Comment",
      "Leave a comment!": "Leave a comment!",
      "Report": "Report",
      "Edit Post": "Edit Post",
      "Delete": "Delete",
      "You can contact the landlord on": "You can contact the landlord on",
      "Are you sure you want to continue?": "Are you sure you want to continue?",

      "Date posted": "Date posted",
      "post not found": "Sorry, we didn't find any posts matching your search criteria",

      "Report Inappropriate or Violation": "Report Inappropriate or Violation",
      "Spam or missleading content": "Spam or missleading content",
      "Scam or impersonation to scam": "Scam or impersonation to scam",
      "Harassment or cyberbullying": "Harassment or cyberbullying",
      "Inappropriate name, image, or content": "Inappropriate name, image, or content",
      "Other": "Other",

    }
},
cn: {
    translation: {
        "Welcome to React": "欢迎",
        "Language": "语言",
        "VANHOUSE": "温哥华租房网",
        "Home": "主页",
        "Login": "登录",
        "Hi": "你好",
        "Account": "帐户",
        "Logout": "登出",
        "User List": "用户列表",

        "City": "城市",
        "Price": "价格",
        "Keyword": "关键词",
        "Cancel": "取消",
      
        "Vancouver":"温哥华",
        "Burnaby":"本拿比",
        "Richmond": "列治文",
        
        "Post": "发布",
        "See more posts": "查看更多",
      
        "Enter email" :  "输入邮箱",
           
        "Email address": "电子邮箱",
        "Password": "密码",
        "Close": "关闭",
        "Forgot Password": "忘记密码",
        "Register for a new account": "注册新账号",

        "forgot password hint": "已为你发送重置信息，请查看邮件。",
        "Submit": "提交",
        "user not found hint": "用户不存在，请注册后再操作。",
        "Please enter an email.": "请输入邮箱地址。",
        "Please enter a valid email.": "请输入有效的邮箱地址。",
        
        "Register": "注册",
        "Enter first name*": "输入名*",
        "Enter last name*": "输入姓*",
        "Confirm password": "确认密码",
        "required fields": "必填字段",
        "Please choose a password": "请选择一个密码",
        "Register hint": "注册后才能发布您自己的房源。",
        "Password at least": "密码必须至少{{0}}个字符。",
        "Password max": "密码必须少于{{0}}个字符.",
        "Password must contain at least 1 number.": "密码必须包含至少一个数字。",
        "Password special": "密码必须包含至少一个特殊字符。",
        "The passwords must match.": "密码必须匹配。",
        
        "Create a new rental listing": "新建租赁信息",
        "Title": "标题",
        "Phone number": "电话号码",
        "Address": "地址",
        "Postal Code": "邮政编码",
        "Payment period": "付款周期",
        "Lease length": "租期",
        "Bedrooms": "卧室",
        "Bathrooms": "洗手间",
        "Square ft": "面积",
        "Utilities included": "包含公共设施",
        "In suite laundry": "带洗衣机",
        "Pets allowed": "允许养宠物",
        "Furnished": "有家具",
        "Continue": "继续",
        "daily": "日付",
        "weekly": "周付",
        "monthly": "月付",
        "no lease": "无期限",
        "months": "个月",
        "year": "年",

        "Select Images": "选择图片",
        "Upload 1-4 images": "上传 1-4 张图片",
        "Select main image": "选择主图",
        "Crop main image": "裁剪主图",
        "Scroll to zoom": "滚动-缩放",
        "Select some available dates": "选择您的日期",
        "Let tenants know": "让房客知道什么时间可以开启行程!",
        "You can pick multiple dates!": "你可以选择多个日期!",
        "Waiting...": "等待...",
        "Image size limit": "图片文件大小超过 1MB. 请选择小于1MB的文件.",

        "Book a home tour!": "预订一次家的旅行!",
        "Email": "电子邮件",
        "Pets friendly": "宠物友好",
        "No pets": "禁止宠物",
        "Utility included": "包含公共设施",
        "Utility not included": "不包含公共设施",
        "Ensuite laundry": "有洗衣机",
        "No ensuite laundry": "没有洗衣机",
        "Unfurnished": "没有家具",
        "View More": "查看更多",
        "Comment": "评论",
        "Leave a comment!": "看了这么久，留下一点评论吧!",
        "Report": "报告",
        "Edit Post": "编辑",
        "Delete": "删除",
        "You can contact the landlord on": "你可以根据以下信息联系房东",
        "Are you sure you want to continue?": "确定要继续吗?",

        "Date posted": "发布日期",
        "post not found": "抱歉，没有合适的房源信息",

        "Report Inappropriate or Violation": "报告违法和不当行为",
        "Spam or missleading content": "垃圾邮件或误导性内容",
        "Scam or impersonation to scam": "骗局或冒充",
        "Harassment or cyberbullying": "骚扰或网络欺诈",
        "Inappropriate name, image, or content": "不合适的标题，图像或者内容",
        "Other": "其他",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
