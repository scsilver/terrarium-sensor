class CreateSensors < ActiveRecord::Migration
  def change
    create_table :sensors do |t|
      t.string :name
      t.string :type
      t.integer :value

      t.timestamps null: false
    end
  end
end
