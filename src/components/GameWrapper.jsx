"use client";
import { useState, useEffect } from 'react';
import MemoryMatrix from '@/games/MemoryMatrix';
import SpeedMath from '@/games/SpeedMath';
import SequenceSimon from '@/games/SequenceSimon';
import ReactionTap from '@/games/ReactionTap';
import NumberOrder from '@/games/NumberOrder';
import WordScramble from '@/games/WordScramble';
import TargetClicker from '@/games/TargetClicker';
import PatternMatch from '@/games/PatternMatch';
import TimeEstimator from '@/games/TimeEstimator';
import TypingSprint from '@/games/TypingSprint';
import GuessNumber from '@/games/GuessNumber';
import RotatePuzzle from '@/games/RotatePuzzle';
import QuickDecision from '@/games/QuickDecision';
import ColorRecall from '@/games/ColorRecall';
import PositionMemory from '@/games/PositionMemory';
import MissingNumber from '@/games/MissingNumber';
import ReverseSequence from '@/games/ReverseSequence';
import OddOneOut from '@/games/OddOneOut';
import AvoidRed from '@/games/AvoidRed';
import DoubleTap from '@/games/DoubleTap';
import RapidChoice from '@/games/RapidChoice';
import DirectionTap from '@/games/DirectionTap';
import DontClick from '@/games/DontClick';
import EquationBuilder from '@/games/EquationBuilder';
import TrueFalse from '@/games/TrueFalse';
import SortIt from '@/games/SortIt';
import BiggerSmaller from '@/games/BiggerSmaller';
import PatternContinuation from '@/games/PatternContinuation';
import BubblePop from '@/games/BubblePop';
import SpeedBalance from '@/games/SpeedBalance';
import HitIcon from '@/games/HitIcon';
import FindObject from '@/games/FindObject';
import BreakBlocks from '@/games/BreakBlocks';
import SynonymMatch from '@/games/SynonymMatch';
import AlphabetOrder from '@/games/AlphabetOrder';
import FillBlank from '@/games/FillBlank';
import CaseSwitch from '@/games/CaseSwitch';
import KeyMemory from '@/games/KeyMemory';
import CatchFood from '@/games/CatchFood';
import ConfusionColors from '@/games/ConfusionColors';
import MathWordSwitch from '@/games/MathWordSwitch';
import StayAwake from '@/games/StayAwake';
import RandomRule from '@/games/RandomRule';
import MiniSudoku from '@/games/MiniSudoku';
import TileSlide from '@/games/TileSlide';
import Match3 from '@/games/Match3';
import RotateShapeMatch from '@/games/RotateShapeMatch';
import MirrorMatch from '@/games/MirrorMatch';
import RhythmTap from '@/games/RhythmTap';
import StackIt from '@/games/StackIt';
import CountFast from '@/games/CountFast';
import TapRace from '@/games/TapRace';
import MultiTask from '@/games/MultiTask';
import TrickQuestion from '@/games/TrickQuestion';
import MissingContext from '@/games/MissingContext';
import FlipLogic from '@/games/FlipLogic';
import RiddleMeThis from '@/games/RiddleMeThis';
import CommonSense from '@/games/CommonSense';
import WhichMakesSense from '@/games/WhichMakesSense';
import NotThatOne from '@/games/NotThatOne';
import RearrangedSentence from '@/games/RearrangedSentence';
import WhatComesNextWeird from '@/games/WhatComesNextWeird';
import DoubleMeaning from '@/games/DoubleMeaning';
import CampusReality from '@/games/CampusReality';
import StudentLife from '@/games/StudentLife';
import BrokeStudent from '@/games/BrokeStudent';
import SleepLogic from '@/games/SleepLogic';
import ExamPanic from '@/games/ExamPanic';
import RandomOpinions from '@/games/RandomOpinions';
import FoodDebates from '@/games/FoodDebates';
import PhoneAddiction from '@/games/PhoneAddiction';
import SocialAwareness from '@/games/SocialAwareness';
import ChaosChoices from '@/games/ChaosChoices';
import FastGuess from '@/games/FastGuess';
import ChangingAnswers from '@/games/ChangingAnswers';
import FakeAnswers from '@/games/FakeAnswers';
import MemoryTrivia from '@/games/MemoryTrivia';
import TypoTrap from '@/games/TypoTrap';
import MathTrick from '@/games/MathTrick';
import ColorConfusion from '@/games/ColorConfusion';
import VisualCue from '@/games/VisualCue';
import QuestionSwitch from '@/games/QuestionSwitch';
import DontAnswerYet from '@/games/DontAnswerYet';
import LuckyGuess from '@/games/LuckyGuess';
import PredictNext from '@/games/PredictNext';
import ReversePsychology from '@/games/ReversePsychology';
import AllAboveTrap from '@/games/AllAboveTrap';
import OppositeDay from '@/games/OppositeDay';
import HiddenRule from '@/games/HiddenRule';
import MysteryQuestion from '@/games/MysteryQuestion';
import RepeatOrNot from '@/games/RepeatOrNot';
import ConfidenceTest from '@/games/ConfidenceTest';
import PersonalityGuess from '@/games/PersonalityGuess';
import LightningChain from '@/games/LightningChain';
import MemoryMathFusion from '@/games/MemoryMathFusion';
import TimeWarp from '@/games/TimeWarp';
import ReverseSolve from '@/games/ReverseSolve';
import FakePattern from '@/games/FakePattern';
import BalanceEquation from '@/games/BalanceEquation';
import MathChaos from '@/games/MathChaos';
import { saveProgress, getProgress } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function GameWrapper({ gameType, level }) {
  const router = useRouter();
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [stars, setStars] = useState(0);

  const handleWin = (earnedStars, score) => {
    setStars(earnedStars);
    setGameState('won');
    saveProgress(gameType, level, earnedStars, score);
  };

  const handleLoss = () => {
    setGameState('lost');
  };

  const renderGame = () => {
    switch (gameType) {
      case 'memory': return <MemoryMatrix level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'math': return <SpeedMath level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'simon': return <SequenceSimon level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'reaction': return <ReactionTap level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'numberorder': return <NumberOrder level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'wordscramble': return <WordScramble level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'targetclicker': return <TargetClicker level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'patternmatch': return <PatternMatch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'timeestimator': return <TimeEstimator level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'typing': return <TypingSprint level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'guess': return <GuessNumber level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'rotate': return <RotatePuzzle level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'decision': return <QuickDecision level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'colorrecall': return <ColorRecall level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'positionmemory': return <PositionMemory level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'missingnumber': return <MissingNumber level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'reversesequence': return <ReverseSequence level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'oddoneout': return <OddOneOut level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'avoidred': return <AvoidRed level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'doubletap': return <DoubleTap level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'rapidchoice': return <RapidChoice level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'directiontap': return <DirectionTap level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'dontclick': return <DontClick level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'equation': return <EquationBuilder level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'truefalse': return <TrueFalse level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'sort': return <SortIt level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'biggersmaller': return <BiggerSmaller level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'patterncontinuation': return <PatternContinuation level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'bubblepop': return <BubblePop level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'balance': return <SpeedBalance level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'hiticon': return <HitIcon level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'findobject': return <FindObject level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'breakblocks': return <BreakBlocks level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'synonym': return <SynonymMatch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'alphabet': return <AlphabetOrder level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'fillblank': return <FillBlank level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'caseswitch': return <CaseSwitch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'keymemory': return <KeyMemory level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'catchfood': return <CatchFood level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'confusion': return <ConfusionColors level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'mathword': return <MathWordSwitch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'stayawake': return <StayAwake level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'randomrule': return <RandomRule level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'sudoku': return <MiniSudoku level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'slide': return <TileSlide level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'match3': return <Match3 level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'rotateshape': return <RotateShapeMatch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'mirror': return <MirrorMatch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'rhythm': return <RhythmTap level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'stack': return <StackIt level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'countfast': return <CountFast level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'taprace': return <TapRace level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'multitask': return <MultiTask level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'trickq': return <TrickQuestion level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'missingcontext': return <MissingContext level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'fliplogic': return <FlipLogic level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'riddle': return <RiddleMeThis level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'commonsense': return <CommonSense level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'makesense': return <WhichMakesSense level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'notthatone': return <NotThatOne level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'rearranged': return <RearrangedSentence level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'nextweird': return <WhatComesNextWeird level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'doublemeaning': return <DoubleMeaning level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'campusreality': return <CampusReality level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'studentlife': return <StudentLife level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'brokestudent': return <BrokeStudent level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'sleeplogic': return <SleepLogic level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'exampanic': return <ExamPanic level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'randomopinions': return <RandomOpinions level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'fooddebates': return <FoodDebates level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'phoneaddiction': return <PhoneAddiction level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'socialawareness': return <SocialAwareness level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'chaoschoices': return <ChaosChoices level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'fastguess': return <FastGuess level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'changinganswers': return <ChangingAnswers level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'fakeanswers': return <FakeAnswers level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'memorytrivia': return <MemoryTrivia level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'typotrap': return <TypoTrap level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'mathtrick': return <MathTrick level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'colorconfusion': return <ColorConfusion level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'visualcue': return <VisualCue level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'questionswitch': return <QuestionSwitch level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'dontanswer': return <DontAnswerYet level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'luckyguess': return <LuckyGuess level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'predictnext': return <PredictNext level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'reversepsych': return <ReversePsychology level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'allabovetrap': return <AllAboveTrap level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'oppositeday': return <OppositeDay level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'hiddenrule': return <HiddenRule level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'mysteryq': return <MysteryQuestion level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'repeatnot': return <RepeatOrNot level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'confidencetest': return <ConfidenceTest level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'personality': return <PersonalityGuess level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'lightning': return <LightningChain level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'mathfusion': return <MemoryMathFusion level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'timewarp': return <TimeWarp level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'reversesolve': return <ReverseSolve level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'fakepattern': return <FakePattern level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'balance_eq': return <BalanceEquation level={level} onWin={handleWin} onLoss={handleLoss} />;
      case 'mathchaos': return <MathChaos level={level} onWin={handleWin} onLoss={handleLoss} />;
      default: return <div style={{color: 'white'}}>Game not fully implemented yet</div>;
    }
  };

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%', padding: '20px', minHeight: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '10px' }}>
        <h2 style={{ color: 'var(--accent-primary)', textTransform: 'capitalize' }}>{gameType} - Level {level}</h2>
        <button onClick={() => router.push('/games')} style={{ background: 'transparent', border: '1px solid var(--panel-border)', color: 'white', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer' }}>Back to Vault</button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {gameState === 'playing' && renderGame()}
        
        {gameState !== 'playing' && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.5s forwards' }}>
            <h1 style={{ fontSize: '3rem', color: gameState === 'won' ? 'var(--nust-accent)' : '#ff4d4d', textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
              {gameState === 'won' ? 'LEVEL CLEARED!' : 'GAME OVER'}
            </h1>
            {gameState === 'won' && (
              <div style={{ fontSize: '2rem', margin: '20px 0', letterSpacing: '10px' }}>
                {Array(3).fill(0).map((_, i) => (
                  <span key={i} style={{ color: i < stars ? 'var(--nust-accent)' : 'rgba(255,255,255,0.2)' }}>★</span>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
              <button 
                onClick={() => setGameState('playing')}
                style={{ padding: '12px 24px', borderRadius: '12px', background: 'var(--panel-bg)', border: '1px solid var(--accent-primary)', color: 'white', cursor: 'pointer' }}
              >
                Retry Level
              </button>
              {gameState === 'won' && level < 30 && (
                <button 
                  onClick={() => {
                    setGameState('playing');
                    router.push(`/game/${gameType}/${level + 1}`);
                  }}
                  style={{ padding: '12px 24px', borderRadius: '12px', background: 'var(--accent-primary)', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Next Level ➔
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
