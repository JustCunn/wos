import React from 'react';
import { Text, View } from 'react-native';
import SOS from './sos.js'
import Report from './report.js';
import Info from './info.js';

import styles from './home.styles.js';

export default function Home(props) {
    return (
        <View style={styles.container}>
            <SOS/>
            <Info/>
            <Report fault="a fault" link="https://forms.gle/nZMFh7Nuo6sHpSBa9"/>
            <Report fault="an injury" link="https://forms.gle/F4o79oxs2zcHko9K7"/>
            <Report fault="broken equipment" link="https://forms.gle/jY1ZDwgdg7mSTTuZ6"/>
        </View>
    )
}