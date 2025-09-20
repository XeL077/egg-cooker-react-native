// RotaryTimerDial.jsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withDecay,
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SIZE = Math.min(260, width - 48);
const RADIUS = SIZE / 2;
const START_ANGLE = -150; // degrees
const ANGLE_RANGE = 300;  // degrees
const MAX_SEC = 15 * 60;  // 15 minutes
const STEP_SEC = 15;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

export default function RotaryTimerDial({ onChange }) {
  const angle = useSharedValue(0); // in degrees, 0..ANGLE_RANGE
  const displaySec = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => { ctx.startAngle = angle.value; },
    onActive: (ev, ctx) => {
      const { x, y } = ev;
      // convert touch coords to angle relative to center
      // assume handler receives coords relative to center; adapt if not
      const dx = x - RADIUS;
      const dy = y - RADIUS;
      const a = Math.atan2(dy, dx) * (180 / Math.PI); // -180..180, 0 at +x
      // convert to angle where 0 is top:
      const degFromTop = a + 90; // now 0 at top
      // normalize to [-180,180]
      let norm = degFromTop;
      if (norm > 180) norm -= 360;
      // map to 0..ANGLE_RANGE using START_ANGLE offset
      let relative = norm - START_ANGLE;
      relative = clamp(relative, 0, ANGLE_RANGE);
      angle.value = relative;
      const normalized = angle.value / ANGLE_RANGE;
      const t = Math.round((normalized * MAX_SEC) / STEP_SEC) * STEP_SEC;
      displaySec.value = t;
      if (onChange) runOnJS(onChange)(t);
    },
    onEnd: (ev) => {
      // optionally add decay/inertia: we skip it for simplicity and snap
      const normalized = angle.value / ANGLE_RANGE;
      const snapped = Math.round((normalized * MAX_SEC) / STEP_SEC) * STEP_SEC;
      // convert time back to angle
      const angleTarget = (snapped / MAX_SEC) * ANGLE_RANGE;
      angle.value = withTiming(angleTarget, { duration: 200 });
      displaySec.value = snapped;
      if (onChange) runOnJS(onChange)(snapped);
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rot = START_ANGLE + angle.value; // deg
    return {
      transform: [{ rotate: `${rot}deg` }]
    };
  });

  const timeText = useAnimatedStyle(() => {
    const mm = Math.floor(displaySec.value / 60);
    const ss = displaySec.value % 60;
    return { };
  });

  // Render simplified: outer circle + inner text; full UI needs SVG arc for progress
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, { width: SIZE, height: SIZE }]}>
        <Animated.View style={[styles.egg, animatedStyle]}>
          <Text style={styles.timeText}>{/* show mm:ss from displaySec via state or shared value binding */}</Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  egg: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#fff7e6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6
  },
  timeText: { fontSize: 32, fontWeight: '700', color: '#333' }
});
