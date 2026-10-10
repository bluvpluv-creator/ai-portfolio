/**
 * 프로필 및 자기소개 관련 데이터 (js/data/profileData.js)
 */
export const profileData = {
    name: "김민서",
    englishName: "Minseo Kim",
    birthYear: "06년생",
    university: "한국외국어대학교",
    department: "Language & AI 융합전공",
    grade: "2학년",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MinseoKim&backgroundColor=0d1117,1f2937&texture=shapes",
    githubUrl: "https://github.com/bluvpluv-creator?tab=overview&from=2026-10-01&to=2026-10-10",
    email: "bluvpluv@gmail.com",
    bioSummary: "언어공학과 인공지능의 융합을 탐구하며, 코딩을 통해 상상을 현실로 만들어갑니다. 어릴 적의 호기심과 추억을 아케이드 게임과 AI 웹 프로젝트로 구현하는 융합형 개발자입니다.",
    
    // 관심 분야
    interests: [
        { name: "머신러닝", icon: "🤖", desc: "자연어 처리 및 데이터 예측 모델링 탐구" },
        { name: "게임 개발", icon: "🎮", desc: "HTML5 Canvas & 아케이드 로직 구현" },
        { name: "데이터 마케팅", icon: "📊", desc: "사용자 데이터 분석 및 마케팅 인사이트 추출" }
    ],

    // 배우고 있는 언어 (모두 40% 미만 설정)
    studyingLanguages: [
        { name: "Python", level: 38, icon: "🐍", color: "#387ef5" },
        { name: "C++", level: 30, icon: "⚡", color: "#00599C" },
        { name: "C", level: 25, icon: "💻", color: "#A8B9CC" },
        { name: "Java", level: 20, icon: "☕", color: "#ED8B00" }
    ]
};
