import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  UserCheck,
  UserX
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal'
import { useAppStore } from '@/store'

const Users: React.FC = () => {
  const { t } = useTranslation()
  const { addNotification } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  
  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 hours ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      location: 'New York, NY',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'User',
      status: 'Active',
      lastActive: '1 day ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      location: 'Los Angeles, CA',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-02-20',
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'Moderator',
      status: 'Inactive',
      lastActive: '1 week ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
      location: 'Chicago, IL',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-03-10',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'User',
      status: 'Active',
      lastActive: '3 hours ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      location: 'Houston, TX',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-04-05',
    },
    {
      id: 5,
      name: 'Eva Brown',
      email: 'eva@example.com',
      role: 'User',
      status: 'Pending',
      lastActive: 'Never',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva',
      location: 'Miami, FL',
      phone: '+1 (555) 567-8901',
      joinDate: '2023-05-12',
    },
  ]
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const handleUserAction = (action: string, user: any) => {
    addNotification({
      type: 'info',
      title: 'User Action',
      message: `You ${action} ${user.name} but this app does nothing!`,
    })
  }
  
  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'Moderator':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'User':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }
  
  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Users - Complex Nothing App</title>
      </Helmet>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t('users')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage users that do absolutely nothing
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter className="h-4 w-4" />}
          >
            Filter
          </Button>
          
          <Button
            onClick={() => handleUserAction('created', { name: 'New User' })}
            icon={<Plus className="h-4 w-4" />}
          >
            Add User
          </Button>
        </div>
      </motion.div>
      
      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Search className="h-5 w-5 text-slate-500" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total Users
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUserAction('opened menu for', user)}
                      className="h-8 w-8 p-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4" />
                    Last active: {user.lastActive}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewUser(user)}
                    className="flex-1"
                  >
                    View
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserAction('edited', user)}
                    icon={<Edit className="h-4 w-4" />}
                  />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserAction('deleted', user)}
                    icon={<Trash2 className="h-4 w-4" />}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* User Detail Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Details"
        size="lg"
      >
        {selectedUser && (
          <>
            <ModalHeader>
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {selectedUser.name}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
            </ModalHeader>
            
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Role
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedUser.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Status
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedUser.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Phone
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedUser.phone}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Location
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedUser.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Join Date
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Last Active
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedUser.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button
                variant="outline"
                onClick={() => setShowUserModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => handleUserAction('edited', selectedUser)}
                icon={<Edit className="h-4 w-4" />}
              >
                Edit User
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Users
