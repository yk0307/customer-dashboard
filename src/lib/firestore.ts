import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  Timestamp,
  FirestoreError
} from 'firebase/firestore'
import { db } from './firebase'
import { Customer } from '@/types/customer'

// Firestore用の顧客データ型（Timestampを含む）
export interface FirestoreCustomer extends Omit<Customer, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Firestoreから取得したデータをCustomer型に変換
export function convertFirestoreCustomer(data: FirestoreCustomer & { id: string }): Customer {
  return {
    ...data,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

// 顧客データをFirestore用に変換
export function convertToFirestoreCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Omit<FirestoreCustomer, 'id'> {
  return {
    ...customer,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
}

// 顧客一覧を取得
export async function getCustomers(): Promise<Customer[]> {
  try {
    const customersRef = collection(db, 'customers')
    const q = query(customersRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as FirestoreCustomer
      return convertFirestoreCustomer({ ...data, id: doc.id })
    })
  } catch (error) {
    console.error('Error getting customers:', error)
    throw new Error('顧客一覧の取得に失敗しました')
  }
}

// 特定の顧客を取得
export async function getCustomer(id: string): Promise<Customer | null> {
  try {
    const customerRef = doc(db, 'customers', id)
    const customerSnap = await getDoc(customerRef)
    
    if (customerSnap.exists()) {
      const data = customerSnap.data() as FirestoreCustomer
      return convertFirestoreCustomer({ ...data, id: customerSnap.id })
    } else {
      return null
    }
  } catch (error) {
    console.error('Error getting customer:', error)
    throw new Error('顧客情報の取得に失敗しました')
  }
}

// 顧客を追加
export async function addCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const customersRef = collection(db, 'customers')
    const firestoreData = convertToFirestoreCustomer(customerData)
    const docRef = await addDoc(customersRef, firestoreData)
    return docRef.id
  } catch (error) {
    console.error('Error adding customer:', error)
    throw new Error('顧客の登録に失敗しました')
  }
}

// 顧客を更新
export async function updateCustomer(id: string, customerData: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
  try {
    const customerRef = doc(db, 'customers', id)
    await updateDoc(customerRef, {
      ...customerData,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error('Error updating customer:', error)
    throw new Error('顧客情報の更新に失敗しました')
  }
}

// 顧客を削除
export async function deleteCustomer(id: string): Promise<void> {
  try {
    const customerRef = doc(db, 'customers', id)
    await deleteDoc(customerRef)
  } catch (error) {
    console.error('Error deleting customer:', error)
    throw new Error('顧客の削除に失敗しました')
  }
}

// エラーハンドリング用のヘルパー関数
export function handleFirestoreError(error: unknown): string {
  if (error instanceof FirestoreError) {
    switch (error.code) {
      case 'permission-denied':
        return 'アクセス権限がありません'
      case 'unavailable':
        return 'サービスが一時的に利用できません'
      case 'not-found':
        return 'データが見つかりません'
      default:
        return 'データベースエラーが発生しました'
    }
  }
  return '予期しないエラーが発生しました'
}