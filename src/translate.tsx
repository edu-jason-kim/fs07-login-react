import { createContext, PropsWithChildren, useContext, useState } from "react";

type Locale = "ko" | "en";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ko",
  setLocale: () => {},
});

export function LocaleContextProvider({ children }: PropsWithChildren<{}>) {
  const [locale, setLocale] = useState<Locale>("ko");

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

const dict = {
  ko: {
    signin: "로그인",
    username: "아이디",
    "email or phone number": "Email 또는 전화번호",
    password: "비밀번호",
    "forgot your password?": "비밀번호를 잊으셨나요?",
    "new user?": "회원이 아니신가요?",
    signup: "가입하기",
  },
  en: {
    signin: "Signin",
    username: "Username",
    "email or phone number": "Email or phone number",
    password: "Password",
    "forgot your password?": "Forgot your password?",
    "new user?": "New user?",
    signup: "Signup",
  },
};

function useLocale() {
  const { locale } = useContext(LocaleContext);
  return locale;
}

export function useSetLocale() {
  const { setLocale } = useContext(LocaleContext);
  return setLocale;
}

// dict 객체의 타입을 가져옴
type Dictionary = typeof dict;
// ko, en이 가지고 있는 객체의 타입을 가져옴 -> entity라고 표현
type DictionaryEntity = Dictionary[Locale];
// entity의 각 key값을 가져옴 (모든 locale이 동일한 key를 가지고 있음)
type DictionaryKey = keyof DictionaryEntity;

// 반환값이 함수
export function useTranslate(): (key: DictionaryKey) => string {
  const locale = useLocale();

  // key를 받아서 해당하는 key에 대한 번역 텍스트를 반환하는 함수
  const t = (key: DictionaryKey) => dict[locale][key];
  return t;
}
