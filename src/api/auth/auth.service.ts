import { Injectable, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { RedisService } from "src/common/redis/redis.service";
import { UserEntity } from "src/core/entity/user.entity";
import { UserRepository } from "src/core/repository/user.repository";
import { CheckOtpDto, CreateOtpDto, RegisterDto } from "./dto/auth.dto";
import { config } from "src/config";
import { MailService } from "./mail.service";


@Injectable()
export class AuthService {
  constructor(
    private redisService: RedisService,
    private mailService: MailService,
    @InjectRepository(UserEntity) private usersRepository: UserRepository
  ) { }

  // Foydalanuvchini kirish uchun email orqali tekshirish
  async login(createOtpDto: CreateOtpDto) {
    const user = await this.usersRepository.findOne({ where: { email: createOtpDto.email } }); // Email orqali foydalanuvchini topish

    // Agar foydalanuvchi topilmasa, xato xabari
    if (!user) {
      console.log("Foydalanuvchi topilmadi");
      throw new ConflictException("Foydalanuvchi topilmadi");
    }

    const otp = this.generateOtp(); // OTP ni yaratish

    // OTP ni Redis ga saqlash, 2 daqiqa davomida amal qiladi
    await this.redisService.setValue({
      key: `otp-${user.id}`,
      value: otp,
      expireTime: 120, // 2 daqiqa
    });
    this.mailService.sendOtp(createOtpDto.email, otp)

    // Muvaffaqiyatli kirish xabari va OTP ni qaytarish
    return {
      message: "Kirish muvaffaqiyatli",
      otp,
    };
  }


  // Yangi foydalanuvchini ro'yxatdan o'tkazish
  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({ where: { email: registerDto.email } }); // Email orqali foydalanuvchini tekshirish

    // Agar foydalanuvchi allaqachon ro'yxatdan o'tgan bo'lsa, xato xabari
    if (existingUser) {
      throw new ConflictException("Foydalanuvchi allaqachon mavjud");
    }

    const otp = this.generateOtp(); // OTP ni yaratish

    // Yangi foydalanuvchini yaratish
    const newUser = this.usersRepository.create({
      email: registerDto.email,
      name: registerDto.name
    });

    await this.usersRepository.save(newUser); // Yangi foydalanuvchini saqlash

    // OTP ni Redis ga saqlash, 2 daqiqa davomida amal qiladi
    await this.redisService.setValue({
      key: `otp-${newUser.id}`,
      value: otp,
      expireTime: 120, // 2 daqiqa
    });

    // OTP ni foydalanuvchiga yuborish
    this.mailService.sendOtp(registerDto.email, otp);

    // Ro'yxatdan o'tish muvaffaqiyatli bo'lsa, OTP qaytarish
    return {
      message: "Ro'yxatdan o'tish muvaffaqiyatli. OTP yuborildi.",
      otp,
    };
  }

  // 6 xonali OTP ni yaratish
  private generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // 6 xonali OTP
  }


  // OTP ni tekshirish
  async checkOtp(checkOtpDto: CheckOtpDto) {
    const user = await this.usersRepository.findOne({ where: { email: checkOtpDto.email } });

    const storeOtp = await this.redisService.getValue(`otp-${user.id}`); // Redisdan saqlangan OTP ni olish
    // Agar saqlangan OTP topilmasa yoki noto'g'ri bo'lsa, xato xabari
    if (!storeOtp || storeOtp.toString() !== checkOtpDto.otp.toString()) {
      throw new ConflictException("Noto'g'ri OTP");
    }

    // JWT token yaratish va uni qaytarish
    const { accessToken, refreshToken } = await this.mailService.generateJwt(user.email, user.role)
    return {
      message: "login successfully",
      accessToken,
      refreshToken,
    };
    
  }

}
