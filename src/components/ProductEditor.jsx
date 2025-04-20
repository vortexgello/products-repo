
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ProductEditor() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    thumbnail: null,
    pdf: null
  });

  const categories = ["Microscopes", "Cameras"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setForm({ ...form, [name]: url });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCategoryChange = (value) => {
    setForm({ ...form, category: value });
  };

  const handleAddProduct = () => {
    if (form.name && form.category && form.thumbnail && form.pdf) {
      setProducts([...products, form]);
      setForm({ name: "", category: "", thumbnail: null, pdf: null });
    }
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "products.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardContent className="grid gap-4 p-4">
          <Input placeholder="Product Name" name="name" value={form.name} onChange={handleChange} />

          <Select onValueChange={handleCategoryChange} value={form.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat, index) => (
                <SelectItem key={index} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="file" accept="image/*" name="thumbnail" onChange={handleChange} />
          <Input type="file" accept="application/pdf" name="pdf" onChange={handleChange} />

          <Button onClick={handleAddProduct}>Add Product</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {products.map((product, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="font-bold">{product.name}</div>
              <div>Category: {product.category}</div>
              <div>Thumbnail: <a href={product.thumbnail} target="_blank">View</a></div>
              <div>PDF: <a href={product.pdf} target="_blank">Download</a></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length > 0 && (
        <div className="mt-4">
          <Button onClick={downloadJSON}>Download JSON</Button>
        </div>
      )}
    </div>
  );
}
