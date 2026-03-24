"use client";
import styles from "./games.module.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';

const GAMES = [
  { id: 'memory', title: 'Memory Matrix', desc: 'Memorize the glowing grid.', icon: '🧠', color: '#66fcf1' },
  { id: 'math', title: 'Speed Math', desc: 'Perform quick arithmetic.', icon: '⚡', color: '#fcd116' },
  { id: 'simon', title: 'Sequence Simon', desc: 'Repeat the pattern.', icon: '🎲', color: '#ff4d4d' },
  { id: 'reaction', title: 'Reaction Tap', desc: 'Test your reflexes.', icon: '⚡', color: '#66fcf1' },
  { id: 'numberorder', title: 'Number Order', desc: 'Tap numbers in sequence.', icon: '🔢', color: '#fcd116' },
  { id: 'wordscramble', title: 'Word Scramble', desc: 'Unscramble the word.', icon: '🧠', color: '#ff4d4d' },
  { id: 'targetclicker', title: 'Target Clicker', desc: 'Accuracy is key.', icon: '🎯', color: '#66fcf1' },
  { id: 'patternmatch', title: 'Pattern Match', desc: 'Fast shape matching.', icon: '🧩', color: '#fcd116' },
  { id: 'timeestimator', title: 'Time Estimator', desc: 'Trust your rhythm.', icon: '⏱️', color: '#ff4d4d' },
  { id: 'typing', title: 'Typing Sprint', desc: 'Speed and precision.', icon: '🔤', color: '#66fcf1' },
  { id: 'guess', title: 'Guess the Number', desc: 'Higher or lower?', icon: '🎲', color: '#fcd116' },
  { id: 'rotate', title: 'Rotate Puzzle', desc: 'Align the pieces.', icon: '🔄', color: '#ff4d4d' },
  { id: 'decision', title: 'Quick Decision', desc: 'Reflexive logic.', icon: '🚦', color: '#66fcf1' },
  { id: 'colorrecall', title: 'Color Recall', desc: 'Remember colors.', icon: '🟦', color: '#66fcf1' },
  { id: 'positionmemory', title: 'Position Memory', desc: 'Recall the dots.', icon: '📍', color: '#fcd116' },
  { id: 'missingnumber', title: 'Missing Number', desc: 'Find the gap.', icon: '🔢', color: '#ff4d4d' },
  { id: 'reversesequence', title: 'Reverse Sequence', desc: 'Backwards input.', icon: '🔁', color: '#66fcf1' },
  { id: 'oddoneout', title: 'Odd One Out', desc: 'Find the different icon.', icon: '🧠', color: '#fcd116' },
  { id: 'avoidred', title: 'Avoid the Red', desc: 'Safe clicks only.', icon: '#ff4343', color: '#ff4343' },
  { id: 'doubletap', title: 'Double Tap', desc: 'Fast twitch reflexes.', icon: '🎯', color: '#66fcf1' },
  { id: 'rapidchoice', title: 'Rapid Choice', desc: 'Pick fast!', icon: '⚡', color: '#fcd116' },
  { id: 'directiontap', title: 'Direction Tap', desc: 'Follow the arrows.', icon: '🔄', color: '#ff4d4d' },
  { id: 'dontclick', title: 'Don\'t Click!', desc: 'Brain confusion.', icon: '🚫', color: '#ff4343' },
  { id: 'equation', title: 'Equation Builder', desc: 'Fill the operator.', icon: '➕', color: '#66fcf1' },
  { id: 'truefalse', title: 'True or False', desc: 'Quick logic check.', icon: '🧩', color: '#fcd116' },
  { id: 'sort', title: 'Sort It', desc: 'Order the numbers.', icon: '🔀', color: '#ff4d4d' },
  { id: 'biggersmaller', title: 'Bigger or Smaller', desc: 'Value comparison.', icon: '📊', color: '#66fcf1' },
  { id: 'patterncontinuation', title: 'Pattern Match', desc: 'Continue sequence.', icon: '🔄', color: '#fcd116' },
  { id: 'bubblepop', title: 'Bubble Pop', desc: 'Don\'t let them escape!', icon: '🫧', color: '#ff4d4d' },
  { id: 'balance', title: 'Speed Balance', desc: 'Keep it steady.', icon: '🐢', color: '#66fcf1' },
  { id: 'hiticon', title: 'Hit the Icon', desc: 'Quick search.', icon: '🎯', color: '#fcd116' },
  { id: 'findobject', title: 'Find the Glow', desc: 'Hidden challenge.', icon: '🔍', color: '#ff4d4d' },
  { id: 'breakblocks', title: 'Break Blocks', desc: 'Order logic.', icon: '🧱', color: '#66fcf1' },
  { id: 'synonym', title: 'Synonym Match', desc: 'Vocabulary test.', icon: '🧠', color: '#fcd116' },
  { id: 'alphabet', title: 'Alphabet Order', desc: 'A to Z.', icon: '🔡', color: '#ff4d4d' },
  { id: 'fillblank', title: 'Fill the Blank', desc: 'Campus humor.', icon: '📝', color: '#66fcf1' },
  { id: 'caseswitch', title: 'Case Switch', desc: 'Upper/Lower fast.', icon: '🔠', color: '#fcd116' },
  { id: 'keymemory', title: 'Key Memory', desc: 'Repeat the keys.', icon: '⌨️', color: '#ff4d4d' },
  { id: 'catchfood', title: 'Catch the Food', desc: 'Avoid the bombs.', icon: '🍕', color: '#66fcf1' },
  { id: 'confusion', title: 'Confusion Colors', desc: 'Stroop effect.', icon: '😵', color: '#fcd116' },
  { id: 'mathword', title: 'Math or Word?', desc: 'Rapid switching.', icon: '🧠', color: '#ff4d4d' },
  { id: 'stayawake', title: 'Stay Awake', desc: 'Tap to survive.', icon: '💤', color: '#66fcf1' },
  { id: 'randomrule', title: 'Random Rule', desc: 'Follow the rules.', icon: '🎲', color: '#fcd116' },
  { id: 'sudoku', title: 'Mini Sudoku', desc: '4x4 logic.', icon: '🧩', color: '#ff4d4d' },
  { id: 'slide', title: 'Tile Slide', desc: 'Sort the tiles.', icon: '🔳', color: '#66fcf1' },
  { id: 'match3', title: 'Match 3', desc: 'Swap and match.', icon: '🧱', color: '#fcd116' },
  { id: 'rotateshape', title: 'Rotate Shape', desc: 'Match the angle.', icon: '🔄', color: '#ff4d4d' },
  { id: 'mirror', title: 'Mirror Match', desc: 'Pick the mirror.', icon: '🪞', color: '#66fcf1' },
  { id: 'rhythm', title: 'Rhythm Tap', desc: 'Feel the beat.', icon: '🎵', color: '#fcd116' },
  { id: 'stack', title: 'Stack It', desc: 'Build the tower.', icon: '📦', color: '#ff4d4d' },
  { id: 'countfast', title: 'Count Fast', desc: 'Quick estimation.', icon: '🔢', color: '#66fcf1' },
  { id: 'taprace', title: 'Tap Race', desc: 'Maximum speed.', icon: '🚀', color: '#fcd116' },
  { id: 'multitask', title: 'Multi Task', desc: 'Do both at once.', icon: '🧠', color: '#ff4d4d' },
  { id: 'trickq', title: 'Trick Question', desc: 'Wait, what?', icon: '🤯', color: '#66fcf1' },
  { id: 'missingcontext', title: 'Missing Context', desc: 'Who is shorter?', icon: '🤔', color: '#fcd116' },
  { id: 'fliplogic', title: 'Flip Logic', desc: 'Reverse day!', icon: '🔄', color: '#ff4d4d' },
  { id: 'riddle', title: 'Riddle Me This', desc: 'Mind test.', icon: '🧩', color: '#66fcf1' },
  { id: 'commonsense', title: 'Common Sense', desc: 'Elephant fridge.', icon: '🐘', color: '#fcd116' },
  { id: 'makesense', title: 'Which Makes Sense?', desc: 'Logic check.', icon: '⚖️', color: '#ff4d4d' },
  { id: 'notthatone', title: 'Not That One', desc: 'Pick wrong.', icon: '🚫', color: '#66fcf1' },
  { id: 'rearranged', title: 'Rearranged Sentence', desc: 'Unscramble logic.', icon: '🔀', color: '#fcd116' },
  { id: 'nextweird', title: 'What Comes Next', desc: 'Weird pattern.', icon: '🧠', color: '#ff4d4d' },
  { id: 'doublemeaning', title: 'Double Meaning', desc: 'Wait, both?', icon: '😵', color: '#66fcf1' },
  { id: 'campusreality', title: 'Campus Reality', desc: 'Sleep or Panic?', icon: '🎓', color: '#fcd116' },
  { id: 'studentlife', title: 'Student Life', desc: 'Meals skipped?', icon: '🍜', color: '#ff4d4d' },
  { id: 'brokestudent', title: 'Broke Student', desc: '$1 budget?', icon: '💸', color: '#66fcf1' },
  { id: 'sleeplogic', title: 'Sleep Logic', desc: 'Legendary night.', icon: '😴', color: '#fcd116' },
  { id: 'exampanic', title: 'Exam Panic', desc: 'Forget everything.', icon: '📚', color: '#ff4d4d' },
  { id: 'randomopinions', title: 'Random Opinions', desc: 'Is cereal soup?', icon: '🧃', color: '#66fcf1' },
  { id: 'fooddebates', title: 'Food Debates', desc: 'Pineapple pizza?', icon: '🍕', color: '#fcd116' },
  { id: 'phoneaddiction', title: 'Phone Addiction', desc: 'Screen time test.', icon: '📱', color: '#ff4d4d' },
  { id: 'socialawareness', title: 'Social Awareness', desc: 'Seen 2:14pm.', icon: '👀', color: '#66fcf1' },
  { id: 'chaoschoices', title: 'Chaos Choices', desc: 'Pure 50/50 luck.', icon: '🤡', color: '#fcd116' },
  { id: 'fastguess', title: 'Fast Guess', desc: 'Answer fast!', icon: '⏱️', color: '#66fcf1' },
  { id: 'changinganswers', title: 'Changing Answers', desc: 'They shuffle!', icon: '🔄', color: '#fcd116' },
  { id: 'fakeanswers', title: 'Fake Answers', desc: 'Spot the real one.', icon: '🎭', color: '#ff4d4d' },
  { id: 'memorytrivia', title: 'Memory Trivia', desc: 'Remember word.', icon: '🧠', color: '#66fcf1' },
  { id: 'typotrap', title: 'Typo Trap', desc: 'Spot spelling.', icon: '🔤', color: '#fcd116' },
  { id: 'mathtrick', title: 'Math Trick', desc: 'Don\'t be fooled.', icon: '🔢', color: '#ff4d4d' },
  { id: 'colorconfusion', title: 'Color Confusion', desc: 'Stroop effect.', icon: '🎨', color: '#66fcf1' },
  { id: 'visualcue', title: 'Visual Cue', desc: 'Tap on glow.', icon: '💡', color: '#fcd116' },
  { id: 'questionswitch', title: 'Question Switch', desc: 'Shifting logic.', icon: '🔄', color: '#ff4d4d' },
  { id: 'dontanswer', title: 'Don\'t Answer', desc: 'Wait for it.', icon: '🚫', color: '#66fcf1' },
  { id: 'luckyguess', title: 'Lucky Guess', desc: 'Pure vibes.', icon: '🎲', color: '#fcd116' },
  { id: 'predictnext', title: 'Predict Next', desc: 'Meta trivia.', icon: '🔮', color: '#ff4d4d' },
  { id: 'reversepsych', title: 'Reverse Psychology', desc: 'Don\'t click!', icon: '🧠', color: '#66fcf1' },
  { id: 'allabovetrap', title: 'All of the Above', desc: 'Classic trap.', icon: '🤔', color: '#fcd116' },
  { id: 'oppositeday', title: 'Opposite Day', desc: 'Yes means No.', icon: '🪞', color: '#ff4d4d' },
  { id: 'hiddenrule', title: 'Hidden Rule', desc: 'Figure it out.', icon: '🎯', color: '#66fcf1' },
  { id: 'mysteryq', title: 'Mystery Question', desc: 'Hidden reveal.', icon: '📦', color: '#fcd116' },
  { id: 'repeatnot', title: 'Repeat or Not?', desc: 'Same again?', icon: '🔁', color: '#ff4d4d' },
  { id: 'confidencetest', title: 'Confidence Test', desc: 'Are you sure?', icon: '🧠', color: '#66fcf1' },
  { id: 'personality', title: 'Personality Check', desc: 'Final vibes.', icon: '🎭', color: '#fcd116' },
  { id: 'lightning', title: 'Lightning Chain', desc: 'Speed math chain.', icon: '⚡', color: '#fcd116', hard: true },
  { id: 'mathfusion', title: 'Math Fusion', desc: 'Memory + Math.', icon: '🧠', color: '#fcd116', hard: true },
  { id: 'timewarp', title: 'Time Warp', desc: 'Equations drift.', icon: '⏱️', color: '#fcd116', hard: true },
  { id: 'reversesolve', title: 'Reverse Solve', desc: 'Find x fast.', icon: '🔀', color: '#fcd116', hard: true },
  { id: 'fakepattern', title: 'Fake Pattern', desc: 'Pattern traps.', icon: '🎭', color: '#fcd116', hard: true },
  { id: 'balance_eq', title: 'Balance Eq', desc: 'Scale the math.', icon: '⚖️', color: '#fcd116', hard: true },
  { id: 'mathchaos', title: 'Math Chaos', desc: 'Pure multi-task.', icon: '🔥', color: '#fcd116', hard: true },
];

export default function GamesHub() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="title-glow" style={{ fontSize: '4rem', marginBottom: '15px' }}>The Game Vault</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto' }}>
          Quest Complete. 100 Games. 1,590+ Levels. Infinite Chill. 🧊
        </p>
      </header>
      
      <div className={styles.gameGrid}>
        {GAMES.map(game => (
          <Link href={`/game/${game.id}/1`} key={game.id} className={`${styles.gameCard} glass-panel ${game.hard ? styles.goldLining : ''}`}>
            <div className={styles.iconWrapper} style={{ backgroundColor: `${game.color}20`, color: game.color }}>
              {game.icon}
            </div>
            <h3 style={{ margin: '15px 0 5px' }}>{game.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{game.desc}</p>
            <div className={styles.levelProgress}>
              <div className={styles.progressBar} style={{ width: '0%', backgroundColor: game.color }}></div>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>0 / 30 Levels</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
