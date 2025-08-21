// src/components/StatusBar.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.timeText}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Icon name="signal" size={14} color="#fff" style={styles.icon} />
        <Icon name="wifi" size={14} color="#fff" style={styles.icon} />
        <View style={styles.batteryContainer}>
          <Text style={styles.batteryText}>100%</Text>
          <Icon name="battery" size={14} color="#fff" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#000',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    opacity: 0.9,
    marginLeft: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  batteryText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    marginRight: 4,
  },
});

export default StatusBar;
