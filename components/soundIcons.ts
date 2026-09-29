import React from 'react';
import {
  Activity, AudioWaveform, Bath, Bell, Bird, BookOpen, Brain, Bug, Car, Cat, Church, CircleDot, Clock, CloudDrizzle, CloudLightning, CloudRain, Coffee, Disc3, Droplets, Ear, Fan, FileText, Fish, Flame, Footprints, Guitar, Heart, HeartPulse, Home, Keyboard, Landmark, Leaf, Moon, Mountain, Music, Music2, Piano, Plane, Popcorn, Radio, RadioTower, Rocket, Sailboat, Snowflake, Sparkles, Sunset, Tent, TrainFront, Trees, Type, Umbrella, Waves, Wind, Zap,
} from 'lucide-react';
import { MIX_SOUNDS } from '../data';

export const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Activity, AudioWaveform, Bath, Bell, Bird, BookOpen, Brain, Bug, Car, Cat, Church,
  CircleDot, Clock, CloudDrizzle, CloudLightning, CloudRain, Coffee, Disc3, Droplets,
  Ear, Fan, FileText, Fish, Flame, Footprints, Guitar, Heart, HeartPulse, Home,
  Keyboard, Landmark, Leaf, Moon, Mountain, Music, Music2, Piano, Plane, Popcorn,
  Radio, RadioTower, Rocket, Sailboat, Snowflake, Sparkles, Sunset, Tent, TrainFront,
  Trees, Type, Umbrella, Waves, Wind, Zap,
};

export const SOUND_BY_ID = Object.fromEntries(MIX_SOUNDS.map(s => [s.id, s]));
