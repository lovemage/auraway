const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ProductService {
  // 獲取所有產品
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // 獲取活躍產品
  async getActiveProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/active`);
      if (!response.ok) {
        throw new Error('Failed to fetch active products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching active products:', error);
      throw error;
    }
  }

  // 根據分類獲取產品
  async getProductsByCategory(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products for category: ${category}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  }

  // 獲取單一產品
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product with id: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  // 創建新產品
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // 更新產品
  async updateProduct(id, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update product with id: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  // 更新產品庫存
  async updateProductStock(id, stock) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update stock for product with id: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating stock for product ${id}:`, error);
      throw error;
    }
  }

  // 切換產品狀態
  async toggleProductStatus(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}/toggle`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        throw new Error(`Failed to toggle status for product with id: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error toggling status for product ${id}:`, error);
      throw error;
    }
  }

  // 刪除產品
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete product with id: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
}

export default new ProductService(); 