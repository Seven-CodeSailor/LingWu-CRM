const basicData = {
  text: '基础数据',
  href: '/basicData',
  icon: '',
  children: [
    {
      text: '数据字典',
      href: '/basicData/dictionary',
      icon: '',
      children: [
        {
          text: '字典分类',
          href: '/basicData/dictionary/classification',
          icon: ''
        },
        {
          text: '字典管理',
          href: '/basicData/dictionary/management',
          icon: ''
        }
      ]
    },
    {
      text: '地区管理',
      href: '/basicData/regional',
      icon: ''
    },
    {
      text: '财务类型',
      href: '/basicData/financial',
      icon: '',
      children: [
        {
          text: '费用收入类型',
          href: '/basicData/financial/incomeType',
          icon: ''
        },
        {
          text: '费用开支类型',
          href: '/basicData/financial/expenseType',
          icon: ''
        },
        {
          text: '银行账号管理',
          href: '/basicData/financial/bankAccount',
          icon: ''
        }
      ]
    },
    {
      text: '仓库管理',
      href: '/basicData/warehouse',
      icon: ''
    },
    {
      text: '商品管理',
      href: '/basicData/product',
      icon: '',
      children: [
        {
          text: '商品品牌',
          href: '/basicData/product/brand',
          icon: ''
        },
        {
          text: '商品类型',
          href: '/basicData/product/type',
          icon: ''
        },
        {
          text: '商品分类',
          href: '/basicData/product/classification',
          icon: ''
        },
        {
          text: '商品规格',
          href: '/basicData/product/specification',
          icon: ''
        },
        {
          text: '商品维护',
          href: '/basicData/product/maintenace',
          icon: ''
        },
        {
          text: '商品SKU',
          href: '/basicData/product/SKU',
          icon: ''
        }
      ]
    }
  ]
}

export default basicData
