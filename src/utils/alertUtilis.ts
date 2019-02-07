import { Alert } from 'react-native'

class AlertUtils {
    /**
     * Shows a general alert dialog with a single "OK" button.
     *
     * @param title - Alert title to show in modal
     * @param message - Alert message to show in modal
     */
    static sendGeneralAlert(title: string, message: string) {
        Alert.alert(title, message, [{ text: 'OK' }])
    }
}

export default AlertUtils