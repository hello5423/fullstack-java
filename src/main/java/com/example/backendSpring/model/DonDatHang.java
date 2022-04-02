package com.example.backendSpring.model;

import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DonDatHang")
public class DonDatHang {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ma_ddh")
	private long maDDH;
	
	@Column(name = "ma_kh")
	private long maKH;
	
	@Column(name = "noi_nhan")
	private String noiNhan;
	
	@Column(name = "ngay_dat_hang", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date ngayDatHang;
	
	@Column(name = "tong_tien")
	private long tongTien;
	
	@Column(name = "trang_thai")
	private String trangThai;
	
	@OneToMany(targetEntity = ChiTietDonHang.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ma_ddh", referencedColumnName = "ma_ddh")
	private List<ChiTietDonHang> chiTietDonHang;
	

	public long getMaDDH() {
		return maDDH;
	}

	public void setMaDDH(long maDDH) {
		this.maDDH = maDDH;
	}

	public String getNoiNhan() {
		return noiNhan;
	}

	public void setNoiNhan(String noiNhan) {
		this.noiNhan = noiNhan;
	}

	public Date getNgayDatHang() {
		return ngayDatHang;
	}

	public void setNgayDatHang(Date ngayDatHang) {
		this.ngayDatHang = ngayDatHang;
	}

	public long getTongTien() {
		return tongTien;
	}

	public void setTongTien(long tongTien) {
		this.tongTien = tongTien;
	}

	public String getTrangThai() {
		return trangThai;
	}

	public void setTrangThai(String trangThai) {
		this.trangThai = trangThai;
	}

	public long getMaKH() {
		return maKH;
	}

	public void setMaKH(long maKH) {
		this.maKH = maKH;
	}

	public List<ChiTietDonHang> getChiTietDonHang() {
		return chiTietDonHang;
	}

	public void setChiTietDonHang(List<ChiTietDonHang> chiTietDonHang) {
		this.chiTietDonHang = chiTietDonHang;
	}
	
	
	
	
	
	
}
