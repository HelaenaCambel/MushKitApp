import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Gauge = ({ label, value, unit, maxValue = 100 }) => {
    const getColorByValue = (val) => {
        if (unit === "°C") {
            if (val <= 3) return 'rgb(0, 255, 255)';         // Cool cyan (cold)
            if (val <= 6) return 'rgb(30, 240, 230)';        // Light cyan
            if (val <= 9) return 'rgb(60, 220, 200)';        // Light turquoise
            if (val <= 12) return 'rgb(90, 200, 170)';       // Turquoise
            if (val <= 15) return 'rgb(120, 180, 140)';      // Light green
            if (val <= 18) return 'rgb(150, 160, 110)';      // Green-yellow
            if (val <= 21) return 'rgb(180, 140, 80)';       // Yellow-orange
            if (val <= 24) return 'rgb(210, 120, 50)';       // Orange
            if (val <= 27) return 'rgb(240, 100, 20)';       // Orange-red
            if (val <= 30) return 'rgb(255, 80, 0)';         // Red-orange
            if (val <= 33) return 'rgb(255, 60, 0)';         // Red
            if (val <= 36) return 'rgb(255, 40, 0)';         // Dark red
            if (val <= 39) return 'rgb(255, 20, 0)';         // Darker red
            if (val <= 42) return 'rgb(255, 0, 0)';          // Bright red (hot)
            return 'rgb(255, 0, 0)';
        } else if (unit === "%") {
            if (val <= 8) return 'rgb(240, 0, 0)';             // Red
            if (val <= 12) return 'rgb(200, 66, 13)';          // Dark orange
            if (val <= 18) return 'rgb(194, 134, 62)';         // Dark yellow-brown
            if (val <= 22) return 'rgb(105, 173, 56)';         // Olive green
            if (val <= 28) return 'rgb(117, 203, 190)';        // Light teal
            if (val <= 32) return 'rgb(56, 174, 173)';         // Cyan-teal
            if (val <= 38) return 'rgb(56, 157, 173)';         // Blue-teal
            if (val <= 42) return 'rgb(15, 147, 167)';         // Teal-blue
            if (val <= 48) return 'rgb(56, 132, 173)';         // Blue
            return 'rgb(56, 70, 114)';                         // Dark blue
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <AnimatedCircularProgress
                size={150}
                width={15}
                fill={(value / maxValue) * 100}
                tintColor={getColorByValue(value)}
                backgroundColor="#ccc"
                rotation={0}
                lineCap="round"
            >
                {(fill) => (
                    <Text style={styles.value}>
                        {Math.round(fill)}{unit}
                    </Text>
                )}
            </AnimatedCircularProgress>
        </View>
    );
};

export default Gauge;

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginVertical: 20 },
    label: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 10 },
    value: { fontSize: 24, fontWeight: 'bold' },
});
