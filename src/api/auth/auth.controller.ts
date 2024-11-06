import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, CreateOtpDto, RegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Login with OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  async login(@Body() createOtpDto: CreateOtpDto) {
    return await this.authService.login(createOtpDto);
  }

  @Post('check-otp')
  @ApiOperation({ summary: 'Check OTP for login' })
  @ApiResponse({ status: 200, description: 'OTP is valid' })
  async checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return await this.authService.checkOtp(checkOtpDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully and OTP sent' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
