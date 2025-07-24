import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../../AuthContext';
import SendIcon from '../../assets/icons/send.svg';
import HandExtendedIcon from '../../assets/icons/hand-extended.svg';
import BankTransferIcon from '../../assets/icons/bank-transfer.svg';
import MoreIcon from '../../assets/icons/dots-horizontal.svg';
import NotificationIcon from '../../assets/icons/checkbox-blank-badge.svg';
import QRCodeScanIcon from '../../assets/icons/qrcode-scan.svg';
import SettingsIcon from '../../assets/icons/cogs.svg';
import { useNavigation } from '@react-navigation/native';

const transactions = [
  { id: 1, type: 'Received', amount: 1500, date: '2024-06-01', from: 'Juan Dela Cruz' },
  { id: 2, type: 'Sent', amount: 500, date: '2024-05-30', to: 'Maria Santos' },
  { id: 3, type: 'Bank Transfer', amount: 2000, date: '2024-05-28', to: 'BPI Savings' },
  { id: 4, type: 'Sent', amount: 6000, date: '2024-05-28', to: 'Banco De Oro' },
  { id: 5, type: 'Sent', amount: 4000, date: '2024-05-28', to: 'Aling Nena' },
  { id: 6, type: 'Received', amount: 10000, date: '2024-05-28', from: 'Aling Nena' },
];

const getAmountStyle = (type: string) => {
  if (type === 'Received') return styles.txAmountReceived;
  return styles.txAmountSent;
};

const LoggedIn = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>PERAMeter</Text>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>₱ 12,500.00</Text>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.actionItem}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => navigation.navigate('Sending')}
          >
            <SendIcon width={28} height={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.actionText}>Send</Text>
        </View>
        <View style={styles.actionItem}>
          <TouchableOpacity style={styles.circleBtn}>
            <HandExtendedIcon width={28} height={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.actionText}>Receive</Text>
        </View>
        <View style={styles.actionItem}>
          <TouchableOpacity style={styles.circleBtn}>
            <BankTransferIcon width={28} height={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.actionText}>Bank Transfer</Text>
        </View>
        <View style={styles.actionItem}>
          <TouchableOpacity style={styles.circleBtn}>
            <MoreIcon width={28} height={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.actionText}>More</Text>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        <ScrollView style={styles.historyList} contentContainerStyle={styles.historyScrollContent}>
          {transactions.map(tx => (
            <View key={tx.id} style={styles.txItem}>
              <Text style={styles.txType}>{tx.type}</Text>
              <Text style={styles.txDetails}>
                {tx.type === 'Received' ? `From: ${tx.from}` : `To: ${tx.to}`}
              </Text>
              <Text style={getAmountStyle(tx.type)}>
                {tx.type === 'Received' ? '+' : '-'}₱ {tx.amount.toLocaleString()}
              </Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn}>
          <NotificationIcon width={24} height={24} />
          <Text style={styles.navLabel}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <QRCodeScanIcon width={24} height={24} />
          <Text style={styles.navLabel}>QR Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <SettingsIcon width={24} height={24} />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoggedIn;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6f5ea', alignItems: 'center', paddingTop: 40, paddingBottom: 0 },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#2ecc40',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  appName: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  balanceLabel: { fontSize: 16, color: '#d0f5d8' },
  balance: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  actionItem: {
    alignItems: 'center',
    width: 80,
  },
  circleBtn: {
    backgroundColor: '#27ae60',
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 6,
  },
  actionText: { color: '#27ae60', fontWeight: 'bold', fontSize: 13, textAlign: 'center' },
  historyContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 80,
    elevation: 2,
    minHeight: 0,
  },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#27ae60' },
  historyList: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  historyScrollContent: {
    flexGrow: 1,
  },
  txItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  txType: { fontWeight: 'bold', color: '#2ecc40' },
  txDetails: { fontSize: 13, color: '#555' },
  txAmountReceived: { fontSize: 16, fontWeight: 'bold', color: '#27ae60' },
  txAmountSent: { fontSize: 16, fontWeight: 'bold', color: '#e74c3c' },
  txDate: { fontSize: 12, color: '#aaa' },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  navBtn: { alignItems: 'center', flex: 1 },
  navLabel: { fontSize: 12, color: '#27ae60', marginTop: 2 },
  logoutBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    elevation: 2,
  },
  logoutText: { fontSize: 14, color: '#27ae60', fontWeight: 'bold' },
});

