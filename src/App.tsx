import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Copy,
  Sparkles,
  Award,
  GraduationCap,
  MessageSquare,
  Users,
  Clock,
  ArrowRight,
  Share2,
  HelpCircle,
  Flame,
  Globe,
  Sliders,
  Check,
  Compass,
  Mail,
  Instagram,
  ExternalLink,
  Palette,
  FileText
} from 'lucide-react';

interface TemplateOption {
  id: string;
  tag: string;
  title: string;
  targetAudience: string;
  text: string;
  highlights: string[];
}

// Helper to render inline highlighted keywords with point colors
function renderHighlightedSpans(content: string) {
  // Regex pattern matching key terms to apply point colors
  const regex =
    /(\[팔로\(pallo \/ 前 컬컴\)\]|팔로\(pallo \/ 前 컬컴\)|일본 현지 5년 거주|일본 5년 거주|일본 5년 체류|디지털할리우드대학 4년 졸업|JLPT N1|JLPT N2|초보자 전용 기초 스터디|왕초보 전용 기초 스터디|눈높이 기초 클래스|눈높이 기초 스터디|왕초보 전문 일본어 튜터|전체적인 수업 진행의 척도와 1:1 맞춤 로드맵|전체 수업 진행의 척도|수업 진행 척도와 속도|앞으로의 수업 진행 척도와 페이스|맞춤 로드맵|baeseowook@gmail\.com|@b_s_w_98)/g;

  const parts = content.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part === '[팔로(pallo / 前 컬컴)]' || part === '팔로(pallo / 前 컬컴)') {
      return (
        <span
          key={i}
          className="font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.5 rounded-md inline-block my-0.5"
        >
          {part}
        </span>
      );
    }
    if (part.includes('5년 거주') || part.includes('5년 체류') || part.includes('디지털할리우드대학')) {
      return (
        <span
          key={i}
          className="font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded-md inline-block my-0.5"
        >
          {part}
        </span>
      );
    }
    if (part === 'JLPT N1' || part === 'JLPT N2') {
      return (
        <span
          key={i}
          className="font-medium text-amber-900 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded-md inline-block my-0.5"
        >
          ★ {part}
        </span>
      );
    }
    if (
      part.includes('기초 스터디') ||
      part.includes('기초 클래스') ||
      part === '왕초보 전문 일본어 튜터'
    ) {
      return (
        <span
          key={i}
          className="font-medium text-rose-700 bg-rose-50 border border-rose-200/80 px-1.5 py-0.5 rounded-md inline-block my-0.5"
        >
          {part}
        </span>
      );
    }
    if (part.includes('척도') || part.includes('로드맵')) {
      return (
        <span
          key={i}
          className="font-medium text-sky-800 bg-sky-50 border border-sky-200/80 px-1.5 py-0.5 rounded-md inline-block my-0.5"
        >
          {part}
        </span>
      );
    }
    if (part === 'baeseowook@gmail.com') {
      return (
        <span key={i} className="font-mono text-slate-700 font-normal">
          {part}
        </span>
      );
    }
    if (part === '@b_s_w_98') {
      return (
        <span key={i} className="font-mono text-slate-700 font-normal">
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

// Colored viewer that parses lines and adds structural highlight & accent color cards
function ColoredTemplateViewer({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 font-gmarket text-sm sm:text-[15px] leading-[1.85] text-slate-800">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Section Headers (Emojis)
        if (
          trimmed.startsWith('🇯🇵') ||
          trimmed.startsWith('💡') ||
          trimmed.startsWith('🧭') ||
          trimmed.startsWith('🎯') ||
          trimmed.startsWith('🌱') ||
          trimmed.startsWith('💬') ||
          trimmed.startsWith('☕') ||
          trimmed.startsWith('📢') ||
          trimmed.startsWith('✨') ||
          trimmed.startsWith('📍') ||
          trimmed.startsWith('📩')
        ) {
          let badgeColor = 'bg-indigo-50/90 border-indigo-200/80 text-indigo-950';

          if (trimmed.startsWith('💡') || trimmed.startsWith('🎯')) {
            badgeColor = 'bg-amber-50/90 border-amber-200/90 text-amber-950';
          } else if (trimmed.startsWith('🧭')) {
            badgeColor = 'bg-sky-50/90 border-sky-200/90 text-sky-950';
          } else if (trimmed.startsWith('📩') || trimmed.startsWith('📍')) {
            badgeColor = 'bg-rose-50/90 border-rose-200/90 text-rose-950';
          } else if (trimmed.startsWith('🌱') || trimmed.startsWith('💬')) {
            badgeColor = 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950';
          }

          return (
            <div
              key={idx}
              className={`mt-4 mb-2 p-3 rounded-xl border font-medium text-sm sm:text-[15px] shadow-2xs ${badgeColor}`}
            >
              {renderHighlightedSpans(trimmed)}
            </div>
          );
        }

        // Numbered list items (e.g., 1. [초보자 맞춤형 눈높이 티칭])
        if (/^\d+\.\s*\[/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s*(\[[^\]]+\])(.*)$/);
          if (match) {
            return (
              <div
                key={idx}
                className="mt-2.5 mb-1 p-2.5 rounded-xl bg-slate-100/70 border border-slate-200/80 flex items-start gap-2 text-slate-900"
              >
                <span className="shrink-0 bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-md mt-0.5">
                  {match[1]}
                </span>
                <div>
                  <span className="font-medium text-indigo-900 mr-1.5">{match[2]}</span>
                  <span>{renderHighlightedSpans(match[3])}</span>
                </div>
              </div>
            );
          }
        }

        // Sub items starting with dash or bullet
        if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('✓')) {
          return (
            <div key={idx} className="pl-4 sm:pl-6 text-slate-700 flex items-start gap-2.5 py-0.5">
              <span className="text-indigo-500 font-medium mt-0.5 shrink-0 text-base leading-none">•</span>
              <span className="flex-1">{renderHighlightedSpans(trimmed.replace(/^[-•✓]\s*/, ''))}</span>
            </div>
          );
        }

        // Contact info lines directly below "수업 문의"
        if (trimmed.startsWith('✉️') || trimmed.startsWith('📸')) {
          return (
            <div key={idx} className="pl-2 sm:pl-3 py-0.5 text-slate-600 flex items-center gap-1.5 text-sm">
              {renderHighlightedSpans(line)}
            </div>
          );
        }

        // Regular paragraphs
        return (
          <div key={idx} className="text-slate-800">
            {renderHighlightedSpans(line)}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'templates' | 'analysis'>('templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('soomgo-short');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'highlight' | 'raw'>('highlight');

  // Teacher details
  const teacherName = '배서욱';
  const academyBrand = '팔로(pallo / 前 컬컴)';
  const residenceYears = '5년';
  const lessonType = '온라인(Zoom/Google Meet) & 대면(수도권 분당/강남 등)';
  const emailAddress = 'baeseowook@gmail.com';
  const instagramHandle = 'b_s_w_98';

  const culcomSummary = [
    {
      title: '성인 맞춤형 일본어 회화 전담 교육',
      desc: `어학원 [${academyBrand}] 일본어 전담 강사로서 다양한 연령대의 성인·직장인 수강생을 대상으로 1:1 상담 및 스피킹 중심 회화 수업 진행`,
      icon: Users,
    },
    {
      title: '초보자 눈높이 기초 스터디 직접 기획·운영',
      desc: '“초급반인데도 진도가 어렵다”는 수강생 피드백을 직접 포착, 수강생들이 자주 막히는 기초 문형·어휘 취약점을 정밀 분석하여 [초보자 전용 기초 클래스]를 직접 런칭 및 운영',
      badge: '★ 핵심 티칭 강점',
      icon: Sparkles,
    },
    {
      title: '수강생 만족도 및 니즈 일치 실현',
      desc: '학습자 중심의 커리큘럼 재설계를 통해 수강생 중도 포기율을 낮추고, 학원 홍보 내용과 실제 수업 만족도의 완벽한 일치를 이끌어냄',
      icon: Award,
    },
    {
      title: '학습 동기 기반 1:1 맞춤 로드맵 설계',
      desc: '첫 회에 기계적인 테스트 대신 학생의 접점, 동기, 도달 목표를 경청하여 가장 이상적인 수업 진행 척도와 페이스를 구축',
      badge: '★ 수강생 케어',
      icon: Compass,
    },
  ];

  const templates: TemplateOption[] = [
    {
      id: 'soomgo-short',
      tag: '숨고 / 김과외 추천',
      title: '핵심 요약형 프로필 (가장 인기있는 기본형)',
      targetAudience: '기초 회화부터 시험 대비까지 모든 수강생에게 신뢰감을 주는 버전',
      highlights: [`일본 ${residenceYears} 거주(대졸)`, `${academyBrand} 일본어 전담 강사`, '초보자 맞춤 커리큘럼', 'JLPT N1'],
      text: `안녕하세요! 일본어 개인과외 강사 ${teacherName}입니다.

🇯🇵 "일본어 공부, 어렵게만 느껴지셨나요?"
저는 성인 전문 어학원인 [${academyBrand}]에서 일본어 회화 전담 강사로 근무하며, 일본어 기초가 전혀 없으신 분들부터 일상 회화 수강생까지 수많은 분들을 가르쳐왔습니다.

💡 저작 직강 과외의 확실한 3가지 강점
1. [초보자 맞춤형 눈높이 티칭]
   - 어학원 재직 시절, "초급반인데도 따라가기 버겁다"는 수강생들의 고충을 직접 해결하기 위해 '왕초보 전용 기초 스터디'를 직접 기획하고 운영한 경험이 있습니다.
   - 어디서 막히는지, 한국인이 자주 헷갈리는 문법이 무엇인지 정확하게 짚어드립니다.

2. [일본 현지 ${residenceYears} 거주 & 4년제 대졸]
   - 일본 디지털할리우드대학 4년 졸업 및 현지 직장·고객 응대 경력으로, 책에서는 배울 수 없는 진짜 자연스러운 억양과 생생한 실전 표현을 전수합니다. (JLPT N1 보유)

3. [1:1 맞춤 커리큘럼 & 꼼꼼한 피드백]
   - 여행 회화 / 워홀·취업 준비 / 비즈니스 / 취미 애니·드라마 회화 / JLPT N2 대비 등 원하는 목표에 맞춰 100% 튜닝해 드립니다.

🧭 [첫 수업 진행 방식 안내]
첫 회 수업에서는 딱딱하고 일방적인 레벨테스트를 보지 않습니다.
수강생분께서
• 일본어를 처음에 어떻게 접하게 되셨는지,
• 어떤 계기로 공부하고 싶으신지(학습 동기),
• 앞으로 어떤 모습으로 잘해지고 싶으신지(목표)
에 대해 편안하게 이야기를 나누며, 수강생 한 분 한 분에 맞춰 **전체적인 수업 진행의 척도와 1:1 맞춤 로드맵**을 함께 세심하게 설계합니다.

📍 수업 방식: ${lessonType}
📩 수업 문의:
✉️ 이메일: ${emailAddress}
📸 인스타그램 DM: @${instagramHandle}

부담 없이 편하게 문의주세요! 친절하게 상담 도와드리겠습니다.`,
    },
    {
      id: 'beginner-focus',
      tag: '왕초보 · 직장인 특화',
      title: '왕초보 안심 밀착형 (기초 진입장벽 낮추기)',
      targetAudience: '히라가나만 알거나 포기 경험이 있는 입문자 맞춤형',
      highlights: [`${academyBrand} 기초 스터디 기획 경험`, '외우지 않는 회화', '동기 맞춤 로드맵'],
      text: `“히라가나만 겨우 아는데 과외 받아도 될까요?”
네, 당연합니다! 오히려 처음 시작할 때 제대로 된 가이드가 필수입니다.

안녕하세요, 왕초보 전문 일본어 튜터 ${teacherName}입니다.

성인 어학원 [${academyBrand}]에서 일본어 강사로 활동할 당시, 제가 가장 집중했던 것은 바로 '초보자 수강생분들의 막막함 해소'였습니다.
기존 수업이 어렵다고 느끼시던 분들을 위해 '눈높이 기초 클래스'를 직접 기획·운영하여, 일본어를 처음 접하는 직장인분들도 한 달 만에 스스로 문장을 만들어 말할 수 있게 이끌었습니다.

🌱 이런 분들께 추천합니다!
- 학원 단체 수업을 들었지만 진도를 못 따라가 포기하셨던 분
- 일본 여행 가서 주문, 길 찾기를 자신 있게 직접 해보고 싶으신 분
- 퇴근 후 부담 없이 즐겁게 자기계발 취미를 갖고 싶으신 직장인
- 억지 암기 대신 원리를 이해하며 편안하게 스피킹하고 싶으신 분

💬 [첫 수업은 이렇게 진행됩니다]
부담스러운 시험이나 딱딱한 레벨테스트는 전혀 없습니다!
첫 회에는 일본어를 처음 접하셨던 계기, 왜 배우고 싶으신지, 앞으로 어떤 실력을 갖추고 싶으신지에 대해 깊이 듣고 공감하며, 수강생분의 눈높이에 꼭 맞춘 '앞으로의 수업 진행 척도와 페이스'를 함께 잡아나갑니다.

일본 ${residenceYears} 거주(대학 졸업)와 JLPT N1의 탄탄한 기본기로, 딱딱하지 않고 친구와 대화하듯 편안한 분위기로 수업합니다.

📩 수업 문의:
✉️ Gmail: ${emailAddress}
📸 Instagram DM: @${instagramHandle}`,
    },
    {
      id: 'conversation-jlpt',
      tag: '회화 & JLPT N2 병행',
      title: '실전 회화 + 자격증 실속형',
      targetAudience: '말하기도 늘리고 JLPT N2/N3 합격도 함께 잡고 싶은 학생·취준생',
      highlights: ['JLPT N2 지도 경력', `${academyBrand} 스피킹 훈련 노하우`, '개인화 척도 설정'],
      text: `일본어 회화와 시험(JLPT), 둘 다 놓치기 싫다면!
어학원 강사 및 1:1 과외 경력의 ${teacherName} 강사와 함께하세요.

저는 어학원 [${academyBrand}]의 일본어 전담 강사로서 다수의 회화 교육 및 수강생 레벨 진단을 진행해 왔으며, 동시에 프리랜서로 개인 1:1 JLPT N2 집중 대비 과외를 성공적으로 지도해 왔습니다.

🎯 본 과외의 차별점
1. '시험용 일본어'와 '실제 말하는 일본어'의 완벽한 밸런스
   - 단어와 문법을 외우고 끝나는 것이 아니라, 바로 그날의 회화 문장으로 입 밖으로 소리 내어 뱉는 훈련을 진행합니다.
2. 수강생의 취약점을 꿰뚫어 보는 지도
   - 어학원에서 초보자·중급자들의 어려움을 분석해 맞춤 커리큘럼을 직접 설계했던 노하우로, 모의고사 오답과 회화 말문이 막히는 원인을 1:1로 정확하게 처방합니다.
3. 일본 현지 ${residenceYears} 거주 & JLPT N1 보유
   - 현지 원어민들이 일상에서 진짜 사용하는 뉘앙스와 청해 비결을 아낌없이 공유합니다.

🧭 [첫 회 오리엔테이션 및 수업 척도 설정]
일괄적인 시험지 테스트 대신, 첫 회차에는 수강생분께서 일본어를 접하게 된 계기와 공부 목적, 목표하시는 실력과 기한을 면밀히 분석합니다. 이를 기반으로 목표 달성에 가장 최적화된 '전체 수업 진행의 척도'와 '1:1 맞춤 커리큘럼'을 확립합니다.

진도만 나가는 지루한 과외는 하지 않습니다. 다음 시험 합격과 유창한 스피킹을 약속드립니다!

📍 수업: ${lessonType}
📩 수업 문의:
✉️ 이메일: ${emailAddress}
📸 인스타그램 DM: @${instagramHandle}`,
    },
    {
      id: 'karrot-casual',
      tag: '당근마켓 / 지역 커뮤니티',
      title: '친근한 동네 과외형 (부담 제로)',
      targetAudience: '가까운 카페나 편안한 분위기에서 1:1로 배우고 싶은 분들',
      highlights: ['친근한 소통', '개인 맞춤 척도', '유학파 실력'],
      text: `[분당/인근 & 온라인] 어학원 출신 강사와 부담 없이 시작하는 1:1 일본어 과외 🇯🇵✨

안녕하세요! 일본 현지 대학교를 졸업하고(일본 ${residenceYears} 거주), 성인 어학원 [${academyBrand}]에서 일본어 회화 수업 및 기초 스터디를 전담으로 진행했던 튜터입니다.

"학원은 사람도 많고 질문하기 눈치 보여요.."
"독학으로 하려니 작심삼일로 끝나요.."

이런 고민 있으셨다면 편하게 연락 주세요! 
어학원에서 일본어 초보자분들을 위해 기초 클래스를 기획·운영했던 경험을 살려, 수강생분의 속도에 맞춰 가장 편안하고 알기 쉽게 가르쳐 드립니다.

💡 [첫 만남 진행 방식]
부담스러운 레벨테스트는 전혀 없습니다 :)
첫 회에는 일본어를 어떻게 접하셨는지, 어떤 계기로 배우고 싶으신지, 앞으로 어떻게 잘해지고 싶으신지 편하게 대화 나누며 나에게 꼭 맞는 '수업 진행 척도와 속도'를 함께 맞춰갑니다.

☕ 수업 내용
- 여행 일본어 & 찐 현지 맛집/쇼핑 필수 표현
- 일상 기초 회화 & 드라마/애니 쉐도잉
- JLPT N3/N2 자격증 대비 (시험 요령 및 단어 암기 꿀팁)

편안한 카페에서 차 한잔 마시며, 혹은 집에서 편하게 온라인으로 대화 나눠봐요!

📩 수업 문의:
✉️ Gmail: ${emailAddress}
📸 Instagram: @${instagramHandle} (DM)`,
    },
    {
      id: 'sns-short-card',
      tag: 'SNS / 오픈채팅 / 인스타용',
      title: '초단축 카드 뉴스 / 인스타 프로필형',
      targetAudience: '한눈에 스펙과 강점이 들어오는 간결한 소개문',
      highlights: ['한눈에 보기', `${academyBrand} 출신`, '맞춤 척도 수립'],
      text: `📢 [1:1 일본어 개인과외 수강생 모집]

👨‍🏫 강사 프로필
• 일본 디지털할리우드대학 4년 졸업 (일본 ${residenceYears} 거주)
• 성인 어학원 [${academyBrand}] 일본어 전담 강사 출신
  (기초 회화 전담, 초보자 맞춤 기초 스터디 직접 기획 및 총괄)
• 프리랜서 일본어 1:1 회화 & JLPT N2 과외 지도
• JLPT N1 최고등급 보유

✨ 이런 분들께 강력 추천!
✓ 학원 수업이 너무 어려워 중도 포기하셨던 분
✓ 기초 문법을 회화 문장으로 자연스럽게 입에 익히고 싶은 분
✓ 일본 ${residenceYears} 체류의 생생한 억양과 현지 표현을 배우고 싶은 분

🧭 첫 수업 진행 방식:
기계적 테스트 ❌
→ 학습 접점, 공부 계기, 목표 실력을 바탕으로 '수강생 맞춤 수업 진행 척도 & 로드맵' 수립!

📩 수업 문의:
✉️ Gmail: ${emailAddress}
📸 Instagram: @${instagramHandle} (DM 환영)`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-gmarket">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">일본어 과외 프로필 & 소개서</h1>
                <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {academyBrand} 경력 기반
                </span>
              </div>
              <p className="text-xs text-slate-500">
                학습 접점·동기·목표 기반 맞춤 척도 설계 | 문의: Gmail & Instagram
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'templates'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              소개글 템플릿 (5종)
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'analysis'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              학원 경력 심층 분석
            </button>
          </div>
        </div>
      </header>

      {/* Hero Overview with Direct Contact Bar */}
      <section className="bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Quick Contact Badge Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-white">수업 상담 및 문의 채널:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-rose-200 border border-red-500/30 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>{emailAddress}</span>
              </a>
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-500/30 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@{instagramHandle} (Instagram DM)</span>
                <ExternalLink className="w-3 h-3 text-pink-300 opacity-60" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-300 font-medium">{academyBrand} 실무 경력</span>
                <p className="text-sm font-semibold text-white mt-0.5">성인 어학원 일본어 회화 전담 강사</p>
                <p className="text-xs text-slate-300 mt-1">1:1 맞춤 상담 및 스피킹 중심 회화 수업 총괄</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-300 font-medium">수업 설계 특장점</span>
                <p className="text-sm font-semibold text-white mt-0.5">첫 회: 학습 동기 & 도달 목표 분석</p>
                <p className="text-xs text-slate-300 mt-1">
                  테스트 대신 수강생 맞춤 수업 진행 척도 & 페이스 구축
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-300 font-medium">검증된 어학 & 유학 백그라운드</span>
                <p className="text-sm font-semibold text-white mt-0.5">일본 {residenceYears} 체류 & JLPT N1 취득</p>
                <p className="text-xs text-slate-300 mt-1">현지 4년제 대학 졸업 + JLPT N2 과외 지도</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Template Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  상황별 맞춤 소개글 선택
                </h2>
                <span className="text-xs text-slate-500">클릭하여 전문 확인 및 복사</span>
              </div>

              {templates.map((tpl) => {
                const isSelected = tpl.id === selectedTemplateId;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border text-left ${
                      isSelected
                        ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tpl.tag}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mt-2">{tpl.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{tpl.targetAudience}</p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {tpl.highlights.map((hl, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Template Preview and Actions */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                {/* Header bar of preview box */}
                <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                        {selectedTemplate.tag}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{selectedTemplate.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{selectedTemplate.targetAudience}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(selectedTemplate.id, selectedTemplate.text)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm shrink-0 ${
                      copiedId === selectedTemplate.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {copiedId === selectedTemplate.id ? (
                      <>
                        <Check className="w-4 h-4" /> 복사 완료!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> 소개글 원클릭 복사
                      </>
                    )}
                  </button>
                </div>

                {/* Sub-bar: View Mode Toggler (Highlight view vs Raw plain view) */}
                <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-medium">보기 방식:</span>
                    <button
                      onClick={() => setPreviewMode('highlight')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                        previewMode === 'highlight'
                          ? 'bg-white text-indigo-700 shadow-2xs font-bold border border-indigo-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5 text-indigo-600" />
                      포인트 컬러 뷰 (가독성 강조)
                    </button>
                    <button
                      onClick={() => setPreviewMode('raw')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                        previewMode === 'raw'
                          ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-300'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      원문 텍스트 뷰 (복사용)
                    </button>
                  </div>
                  <span className="hidden sm:inline text-slate-400 text-[11px]">G마켓 산스 폰트 적용됨</span>
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 bg-white flex flex-col">
                  {previewMode === 'highlight' ? (
                    <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 shadow-inner flex-1 overflow-auto select-all">
                      <ColoredTemplateViewer text={selectedTemplate.text} />
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 font-gmarket text-sm sm:text-[15px] font-normal text-slate-800 leading-[1.85] whitespace-pre-wrap flex-1 select-all shadow-inner">
                      {selectedTemplate.text}
                    </div>
                  )}

                  {/* Why this works tips */}
                  <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-200/70 flex items-start gap-2.5">
                    <Compass className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-indigo-950">
                      <span className="font-semibold">이 수업 척도 설정 방식이 효과적인 이유:</span>
                      <p className="mt-0.5 text-indigo-800">
                        기계적인 테스트에 거부감을 느끼는 수강생에게 심리적 안정감을 주며, <strong>학습자의 실제 배경과 목적을 바탕으로 진도를 조율한다는 진정성</strong>을 전달하여 등록 전환율을 높입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-xl bg-rose-100 text-rose-600 font-bold text-xs">
                  경력 증명 분석
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  이력서 내 어학원 [{academyBrand}] 활동 내용 상세 추출
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                이력서 2페이지에 기재된 <strong>어학원 [{academyBrand}] (2025.09 ~ 2026.06 현재)</strong> 및 하단 지망동기·어필포인트에 서술된 실무 및 성과 내용을 과외 강사의 관점으로 구조화하여 추출했습니다.
              </p>
            </div>

            {/* Extracted Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {culcomSummary.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 text-indigo-600">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        {item.badge && (
                          <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      과외 소개문 활용: 신규 수강생의 신뢰도와 호감도 견인
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Synergy & Selling points breakdown */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                {academyBrand} 경력 + 이력서 배경의 3중 시너지 포인트
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                단순 어학 능력자를 넘어 '믿고 맡길 수 있는 검증된 튜터'로 포지셔닝하는 핵심 요소
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <h4 className="font-bold text-rose-300 mb-1">1. {academyBrand} 실무 경험</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    실제 성인 회화 학원에서 다양한 수준의 학습자들과 상담하고 티칭을 담당했으므로, 초보 수강생이 어떤 지점에서 흥미를 잃거나 좌절하는지 정확히 인지하고 있습니다.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <h4 className="font-bold text-amber-300 mb-1">2. 커리큘럼 자체 기획 역량</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    주어진 책만 읽는 수업이 아니라, "초보자가 실제로 소화할 수 있는" 맞춤형 학습 자료와 루틴을 직접 설계하고 검증해 본 경험이 있습니다.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                  <h4 className="font-bold text-cyan-300 mb-1">3. 일본 현지 {residenceYears} 체류 + 1:1 과외 경력</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    2025년 10월부터 개인 일본어 회화 및 JLPT N2 대비 과외를 진행해 왔으며, 일본 4년제 대졸과 N1 합격으로 이론과 실전 뉘앙스 모두 완벽 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400">
        <div className="flex items-center justify-center gap-4 mb-2">
          <a
            href={`mailto:${emailAddress}`}
            className="flex items-center gap-1 text-slate-600 hover:text-rose-600 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>{emailAddress}</span>
          </a>
          <span className="text-slate-300">|</span>
          <a
            href={`https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-600 hover:text-pink-600 transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span>@{instagramHandle}</span>
          </a>
        </div>
        <p>일본어 과외 프로필 작성 도구 • Bae Seowook ({academyBrand} 경력 분석 완료)</p>
      </footer>
    </div>
  );
}
