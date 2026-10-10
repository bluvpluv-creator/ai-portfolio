/**
 * 매직 8볼 30가지 답변 데이터 (js/data/magic8ballData.js)
 */
export const magic8ballAnswers = [
    // 긍정적이고 확신을 주는 조언 (긍정형)
    { type: "positive", category: "긍정형", text: "지금 당신이 생각하는 그 길로 곧장 나아가세요. 틀리지 않았습니다.", icon: "✨" },
    { type: "positive", category: "긍정형", text: "조금 늦더라도 결국 당신이 원하는 대로 이루어질 것입니다.", icon: "🌟" },
    { type: "positive", category: "긍정형", text: "당신의 선택을 믿으세요. 조만간 좋은 소식이 찾아옵니다.", icon: "🍀" },
    { type: "positive", category: "긍정형", text: "망설이지 말고 지금 바로 행동으로 옮길 때입니다.", icon: "🚀" },
    { type: "positive", category: "긍정형", text: "기대 이상으로 결과가 좋을 테니 걱정은 내려놓으세요.", icon: "☀️" },
    { type: "positive", category: "긍정형", text: "충분히 잘해왔고, 앞으로는 더 잘해낼 것입니다.", icon: "💪" },

    // 냉철하고 이성적인 조언 (현실형)
    { type: "realistic", category: "현실형", text: "감정을 한 걸음 뒤로하고, 객관적인 데이터와 사실만 바라보세요.", icon: "📊" },
    { type: "realistic", category: "현실형", text: "지금은 결정을 내릴 때가 아닙니다. 한 번 더 숨을 고르세요.", icon: "⏳" },
    { type: "realistic", category: "현실형", text: "가장 최악의 시나리오를 대비하는 것이 지금 할 일입니다.", icon: "🛡️" },
    { type: "realistic", category: "현실형", text: "혼자 끙끙 앓지 말고, 주변의 전문가나 믿을 만한 사람에게 조언을 구하세요.", icon: "🗣️" },
    { type: "realistic", category: "현실형", text: "모든 사람을 만족시킬 수는 없습니다. 당신 자신을 1순위에 두세요.", icon: "🎯" },
    { type: "realistic", category: "현실형", text: "때로는 포기하는 것도 용기입니다. 과감히 내려놓는 건 어떨까요?", icon: "🛑" },

    // 위로와 공감을 전하는 조언 (힐링형)
    { type: "healing", category: "힐링형", text: "많이 힘들었겠네요. 오늘은 아무 생각 말고 푹 쉬는 것이 정답입니다.", icon: "🛋️" },
    { type: "healing", category: "힐링형", text: "완벽하지 않아도 괜찮아요. 당신은 존재 자체로 이미 소중합니다.", icon: "💖" },
    { type: "healing", category: "힐링형", text: "시간이 해결해 줄 문제입니다. 마음의 짐을 조금 덜어내세요.", icon: "🌊" },
    { type: "healing", category: "힐링형", text: "지금의 실패는 더 큰 도약을 위한 값진 예방주사일 뿐입니다.", icon: "🌱" },
    { type: "healing", category: "힐링형", text: "누구나 길을 잃습니다. 천천히 당신만의 속도로 걸어가세요.", icon: "🚶" },
    { type: "healing", category: "힐링형", text: "당신 잘못이 아닙니다. 스스로를 너무 자책하지 마세요.", icon: "🤝" },

    // 반전이 있거나 유머러스한 조언 (위트형)
    { type: "witty", category: "위트형", text: "고민할 시간에 차라리 맛있는 음식을 먹고 잠을 자는 게 이득입니다.", icon: "🍕" },
    { type: "witty", category: "위트형", text: "동전 앞뒷면을 던져서 결정하세요. 던지는 순간 마음이 원하는 쪽을 알게 됩니다.", icon: "🪙" },
    { type: "witty", category: "위트형", text: "지나고 보면 정말 아무것도 아닌 일입니다. 일단 웃어보세요!", icon: "😄" },
    { type: "witty", category: "위트형", text: "우주는 당신의 고민보다 훨씬 넓습니다. 너무 심각해지지 마세요.", icon: "🌌" },
    { type: "witty", category: "위트형", text: "내일의 나에게 이 고민을 토스하세요. 내일의 내가 해결할 겁니다.", icon: "💤" },
    { type: "witty", category: "위트형", text: "당장 스마트폰을 끄고 밖으로 나가 10분만 걸어보세요.", icon: "👟" },

    // 새로운 관점을 제시하는 조언 (전환형)
    { type: "perspective", category: "전환형", text: "문제가 아니라 기회일 수 있습니다. 시각을 완전히 뒤집어 보세요.", icon: "🔄" },
    { type: "perspective", category: "전환형", text: "가장 먼저 떠오른 생각, 그것이 당신의 진짜 본심입니다.", icon: "💡" },
    { type: "perspective", category: "전환형", text: "지금 당장 바꿀 수 없는 일이라면 걱정하는 것을 멈추세요.", icon: "🧘" },
    { type: "perspective", category: "전환형", text: "남들의 시선은 신경 쓰지 마세요. 그들은 당신에게 그리 관심이 없습니다.", icon: "👀" },
    { type: "perspective", category: "전환형", text: "과거에 얽매이지 마세요. 중요한 건 '지금, 여기'입니다.", icon: "⏳" },
    { type: "perspective", category: "전환형", text: "단점을 고치려 애쓰기보다 당신의 장점을 극대화하는 데 집중하세요.", icon: "💎" }
];
