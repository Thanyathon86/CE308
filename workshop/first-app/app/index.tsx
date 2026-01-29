import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';


const DATA = [
  { id: '1', title: ' ชอบดูหนัง' },
  { id: '2', title: ' ชอบเล่นเกม' },
  { id: '3', title: ' เล่นกีต้าร์' },
  { id: '4', title: ' ออกกำลังกาย' },
  { id: '5', title: ' ชอบถ่ายรูป' },
  { id: '6', title: ' ชอบขับรถ' },
]

const dislike = [
   { id: '1', title: ' ไม่ชอบรถติด' },
  { id: '2', title: ' ไม่ชอบอากาศหนาว' },
  { id: '3', title: ' ไม่ชอบการวิ่ง' },
  { id: '4', title: ' ไม่ชอบเเมลงสาบ' },
  { id: '5', title: ' ไม่ชอบฝุ่นมลพิษ' },
  { id: '6', title: ' ไม่ชอบขับรถเเล้วรถติด' },
]



const renderItem = ({ item}: { item: {id: string; title : string} }) => (
  <View style={styles.itemContainer}>
    <View style={styles.dot} />
    <Text style={styles.itemText}>{item.title}</Text>
  </View>
);



const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}> My Prolfile</Text>
      </View>





      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#FF6B6B'}]}>
          <Text style={styles.boxText}> รหัสวิชา : 67110090</Text>
        </View>
         <View style={[styles.box, { backgroundColor: '#4ECDC4'}]}>
          <Text style={styles.boxText}> คณะ : วิศวะกรรมมศาสร์</Text>
          </View>
           <View style={[styles.box, { backgroundColor: '#198AD4'}]}>
          <Text style={styles.boxText}> สาขา : วิศวะกรรมคอมพิวเตอร์</Text>
          </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว :</Text>
        {Array.from(['ชื่อจริง : ธัญญธร วงษ์จันทร์ ', 'ชื่อเล่น : ต้นน้ำ', 'อายุ : 21','Email : tonnam@gmail.com' ]).map((text, index) => (
          <View key={index} style={styles.listItem}> 
          <Text>{text}</Text>
          </View>
          ))}
           <Text style={styles.title}>การศึกษา :</Text>
        {Array.from(['ระดับแุดมศึกษา : มหาวิทยาลัยธุรกิจบัณฑิตย์', 'สขาขวิชาวิศวะกรรมคอมพิวเตอร์ ชั้นปีที่ 2']).map((text, index) => (
          <View key={index} style={styles.listItem}> 
          <Text>{text}</Text>
          </View>
          ))}
          <Text style={styles.title}>ที่อยู่ :</Text>
        {Array.from(['ที่อยู่ : ตรงข้ามมหาวิทยาลัยธุรกิจบัณฑิตย์ ซอย 8']).map((text, index) => (
          <View key={index} style={styles.listItem}> 
          <Text>{text}</Text>
          </View>
          ))}



      </View>

      <View style={styles.contentSection}>
        <FlatList
        data={DATA} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>}
        />
      </View>

      <View style={styles.contentSection}>
        <FlatList
        data={dislike} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ไม่ชอบ</Text>}
        />
      </View>

      
          
      
     

    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  scrollContent: {
    padding : 20,
    backgroundColor: '#FFe383',
  },
header: {
  height: 100,
  backgroundColor: '#30A0E0',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginBottom: 20,
},
headerText: {
  color: 'black',
  fontSize: 24,
  fontWeight: 'bold',
},
row: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 marginBottom: 20,
},
box: {
  flex: 1,
  height: 100,
  marginHorizontal: 5,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
},
boxText: {
  color: 'white',
  fontWeight: '600',
},
contentSection: {
  marginTop: 10,
},
title: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
listItem: {
  backgroundColor: '#30A0E0',
  padding: 15,
  borderRadius: 5,
  marginBottom: 10,
  borderLeftWidth: 5,
  borderLeftColor: '#006BBB',
},
contentSectionFlatList: {
  marginTop: 20,
},
headerFlatList: {
  fontSize: 24,
  fontWeight: 'bold',
  padding: 20,
  backgroundColor: '#30A0E0'
},
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#add',
},
dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: 'blue',
  marginRight: 10,
},
itemText: {
  fontSize: 18,
},



});

export default App;