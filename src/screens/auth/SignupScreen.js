import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';
import { SvgXml } from 'react-native-svg';

// Import SVG files
import GoogleIcon from '../../assets/icons/google.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import EmailIcon from '../../assets/icons/email.svg';
import LockIcon from '../../assets/icons/lock.svg';
import EyeIcon from '../../assets/icons/eye.svg';

const SocialButton = ({ Icon, title, onPress }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <Icon width={24} height={24} style={styles.socialIcon} />
    <Text style={styles.socialButtonText}>{title}</Text>
  </TouchableOpacity>
);

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Temporary navigation hack until auth is connected
    navigation.navigate('Gender');
  };

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const handleAppleLogin = () => {
    // Handle Apple login
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Enter details you used during your registration</Text>

          <View style={styles.socialButtons}>
            <SocialButton
              Icon={GoogleIcon}
              title="Continue with google"
              onPress={handleGoogleLogin}
            />
            <SocialButton
              Icon={AppleIcon}
              title="Continue with apple"
              onPress={handleAppleLogin}
            />
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or Continue With</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <EmailIcon width={20} height={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="hopemikealson22@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <LockIcon width={20} height={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <EyeIcon width={20} height={20} style={styles.inputIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: SPACING.medium,
    paddingTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: SPACING.xlarge,
    textAlign: 'center',
  },
  socialButtons: {
    gap: SPACING.small,
    marginBottom: SPACING.large,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.medium,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: SPACING.small,
  },
  socialButtonText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: SPACING.medium,
    color: '#64748B',
    fontSize: 14,
  },
  form: {
    gap: SPACING.medium,
  },
  inputContainer: {
    marginBottom: SPACING.small,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: SPACING.medium,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: SPACING.small,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    color: '#0F172A',
  },
  eyeIcon: {
    padding: SPACING.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: SPACING.medium,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.large,
  },
  registerText: {
    fontSize: 14,
    color: '#64748B',
  },
  registerLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default SignupScreen; 