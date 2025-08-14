// File validation constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_DOCUMENT_FORMATS = ['docx', 'doc', 'pdf', 'xlsx', 'zip', 'rar']
export const ACCEPTED_IMAGE_FORMATS = ['jpg', 'png']
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!@#$%^&*?<>])[A-Za-z\d@!@#$%^&*?<>]{8,}$/

// Generic error messages
export const ERROR_MESSAGES = {
  required: 'Vui lòng nhập thông tin',
  requiredTitle: 'Vui lòng nhập tiêu đề',
  requiredContent: 'Vui lòng nhập nội dung',
  requiredSubTitle: 'Vui lòng nhập tiêu đề phụ',
  requiredStartDate: 'Vui lòng chọn ngày bắt đầu',
  requiredImage: 'Vui lòng chọn ảnh đại diện',
  requiredCategory: 'Vui lòng chọn ít nhất một danh mục',
  invalidImageFormat: 'Chỉ chấp nhận file có định dạng .jpg hoặc .png.',
  invalidDocFormat: 'Loại file không phù hợp. Vui lòng sử dụng các loại file: DOCX, DOC, PDF, XLSX, ZIP, RAR',
  fileSizeLimit: 'Kích thước file không được vượt quá 5MB.',
  invalidEmail: 'Địa chỉ email không hợp lệ',
  requiredEmail: 'Vui lòng nhập email',
  requiredPassword: 'Vui lòng nhập mật khẩu',
  invalidPassword:
    'Mật khẩu không hợp lệ. Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ cái viết thường, chữ cái viết hoa,chữ số và  ký tự đặc biệt.',
  confirmPassword: 'Vui lòng nhập lại mật khẩu',
  confirmPasswordNotMatch: 'Mật khẩu không khớp',
  requiredFirstName: 'Vui lòng nhập họ',
  requiredLastName: 'Vui lòng nhập tên',
  requiredPermissionCodes: 'Vui lòng chọn ít nhất phân quyền',
  requiredUserName: 'Vui lòng nhập tên người dùng',
  requiredConfirmPassword: 'Mật khẩu không khớp. Vui lòng nhập lại'
}
