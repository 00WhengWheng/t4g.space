import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from 'shared/native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to T4G.Space</Text>
          <Text style={styles.subtitle}>Tag 4 Gift Business Dashboard</Text>
        </View>

        <View style={styles.grid}>
          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Total Gifts</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.number}>1,234</Text>
              <Text style={styles.smallText}>+12% from last month</Text>
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.number}>567</Text>
              <Text style={styles.smallText}>+5% from last month</Text>
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.number}>23%</Text>
              <Text style={styles.smallText}>+2% from last month</Text>
            </CardContent>
          </Card>

          <Card style={styles.card}>
            <CardHeader>
              <CardTitle>Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.number}>4.8</Text>
              <Text style={styles.smallText}>+0.1 from last month</Text>
            </CardContent>
          </Card>
        </View>

        <Card style={styles.wideCard}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <View style={styles.activityItem}>
              <View style={[styles.dot, { backgroundColor: '#3b82f6' }]} />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>New gift package created</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Challenge completed by user</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Analytics report generated</Text>
                <Text style={styles.activityTime}>6 hours ago</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.wideCard}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              title="🎁 Create New Gift" 
              onPress={() => console.log('Create Gift')}
              style={styles.actionButton}
            />
            <Button 
              title="👥 Manage Users" 
              onPress={() => console.log('Manage Users')}
              variant="outline"
              style={styles.actionButton}
            />
            <Button 
              title="📊 View Analytics" 
              onPress={() => console.log('View Analytics')}
              variant="outline"
              style={styles.actionButton}
            />
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
  wideCard: {
    width: '100%',
    marginBottom: 16,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  smallText: {
    fontSize: 12,
    color: '#6b7280',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionButton: {
    marginBottom: 8,
  },
});
